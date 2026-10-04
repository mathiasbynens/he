#!/usr/bin/env node
import packageJson from '../package.json' with { type: 'json' };
import * as he from '../src/he.mjs';

const { version } = packageJson;

const strings = process.argv.slice(2);
const stdin = process.stdin;
const options = {};
const log = console.log;
let action;
let timeout;

const flags = new Map([
	[
		'--escape',
		() => {
			action = 'escape';
		},
	],
	[
		'--encode',
		() => {
			action = 'encode';
		},
	],
	[
		'--use-named-refs',
		() => {
			action = 'encode';
			options.useNamedReferences = true;
		},
	],
	[
		'--everything',
		() => {
			action = 'encode';
			options.encodeEverything = true;
		},
	],
	[
		'--allow-unsafe',
		() => {
			action = 'encode';
			options.allowUnsafeSymbols = true;
		},
	],
	[
		'--decimal',
		() => {
			action = 'encode';
			options.decimal = true;
		},
	],
	[
		'--decode',
		() => {
			action = 'decode';
		},
	],
	[
		'--attribute',
		() => {
			action = 'decode';
			options.isAttributeValue = true;
		},
	],
	[
		'--strict',
		() => {
			action = 'decode';
			options.strict = true;
		},
	],
]);

const main = () => {
	const option = strings[0];
	let count = 0;

	if (/^(?:-h|--help|undefined)$/.test(option)) {
		log('he v%s - https://mths.be/he', version);
		log(
			[
				'\nUsage:\n',
				'\the [--escape] string',
				'\the [--encode] [--use-named-refs] [--everything] [--allow-unsafe] [--decimal] string',
				'\the [--decode] [--attribute] [--strict] string',
				'\the [-v | --version]',
				'\the [-h | --help]',
				'\nExamples:\n',
				'\the --escape \\<img\\ src\\=\\\'x\\\'\\ onerror\\=\\"prompt\\(1\\)\\"\\>',
				"\techo '&copy; &#x1D306;' | he --decode",
			].join('\n'),
		);
		return process.exit(option ? 0 : 1);
	}

	if (/^(?:-v|--version)$/.test(option)) {
		log('v%s', version);
		return process.exit(0);
	}

	for (const string of strings) {
		// Process options.
		const flag = flags.get(string);
		if (flag) {
			flag();
			continue;
		}
		// Process string(s).
		if (!action) {
			log('Error: he requires at least one option and a string argument.');
			log('Try `he --help` for more information.');
			return process.exit(1);
		}
		try {
			log(he[action](string, options));
			count++;
		} catch (error) {
			log(`${error.message}\n`);
			log('Error: failed to %s.', action);
			log('If you think this is a bug in he, please report it:');
			log('https://github.com/mathiasbynens/he/issues/new');
			log('\nStack trace using he@%s:\n', version);
			log(error.stack);
			return process.exit(1);
		}
	}
	if (!count) {
		log('Error: he requires a string argument.');
		log('Try `he --help` for more information.');
		return process.exit(1);
	}
	// Exit with status 0 after the loop, in case multiple strings were passed in.
	return process.exit(0);
};

if (stdin.isTTY) {
	// Handle shell arguments.
	main();
} else {
	// Either the script is called from within a non-TTY context, or `stdin`
	// content is being piped in.
	if (!process.stdout.isTTY) {
		// The script was called from a non-TTY context. This is a rather uncommon
		// use case we don’t actively support. However, we don’t want the script
		// to wait forever in such cases, so…
		timeout = setTimeout(() => {
			// …if no piped data arrived after a whole minute, handle shell
			// arguments instead.
			main();
		}, 60_000);
	}
	let data = '';
	stdin.on('data', (chunk) => {
		clearTimeout(timeout);
		data += chunk;
	});
	stdin.on('end', () => {
		strings.push(data.trim());
		main();
	});
	stdin.resume();
}
