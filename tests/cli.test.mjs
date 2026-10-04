import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import packageJson from '../package.json' with { type: 'json' };

const { version } = packageJson;

const binPath = fileURLToPath(new URL('../bin/he.mjs', import.meta.url));

// Runs the CLI with the given arguments, piping `input` to stdin.
const run = (args, input = '') => {
	return new Promise((resolve) => {
		const child = execFile(
			process.execPath,
			[binPath, ...args],
			(error, stdout) => {
				resolve({ code: error ? error.code : 0, stdout });
			},
		);
		child.stdin.end(input);
	});
};

// Note: when stdin is not a TTY, the CLI appends the (trimmed) piped input as
// an extra string argument. With empty input, that yields an extra empty line.

test('cli: --escape', async () => {
	const { code, stdout } = await run(['--escape', '<img src="x">']);
	assert.equal(code, 0);
	assert.equal(stdout, '&lt;img src=&quot;x&quot;&gt;\n\n');
});

test('cli: --decode via stdin', async () => {
	const { code, stdout } = await run(['--decode'], '&copy; &#x1D306;\n');
	assert.equal(code, 0);
	assert.equal(stdout, '\u00A9 \uD834\uDF06\n');
});

test('cli: --encode with flags', async () => {
	const { code, stdout } = await run(
		['--use-named-refs', '--decimal'],
		'\u00A9\u2603',
	);
	assert.equal(code, 0);
	assert.equal(stdout, '&copy;&#9731;\n');
});

test('cli: --decode --strict reports parse errors', async () => {
	const { code, stdout } = await run(['--decode', '--strict', '&amp']);
	assert.equal(code, 1);
	assert.match(
		stdout,
		/Parse error: named character reference was not terminated by a semicolon/,
	);
	assert.match(stdout, /Error: failed to decode\./);
});

test('cli: --version', async () => {
	const { code, stdout } = await run(['--version']);
	assert.equal(code, 0);
	assert.equal(stdout, `v${version}\n`);
});

test('cli: --help', async () => {
	const { code, stdout } = await run(['--help']);
	assert.equal(code, 0);
	assert.match(stdout, /^he v\d+\.\d+\.\d+ - https:\/\/mths\.be\/he\n/);
	assert.match(stdout, /Usage:/);
});

test('cli: a string without an action is an error', async () => {
	const { code, stdout } = await run(['foo']);
	assert.equal(code, 1);
	assert.match(stdout, /requires at least one option/);
});
