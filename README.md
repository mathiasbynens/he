# he [![Test status](https://github.com/mathiasbynens/he/actions/workflows/test.yml/badge.svg)](https://github.com/mathiasbynens/he/actions/workflows/test.yml) [![he on npm](https://img.shields.io/npm/v/he)](https://www.npmjs.com/package/he)

_he_ (for “HTML entities”) is a robust HTML entity encoder/decoder written in JavaScript. It supports [all standardized named character references as per HTML](https://html.spec.whatwg.org/multipage/syntax.html#named-character-references), handles [ambiguous ampersands](https://mathiasbynens.be/notes/ambiguous-ampersands) and other edge cases [just like a browser would](https://html.spec.whatwg.org/multipage/syntax.html#tokenizing-character-references), has an extensive test suite, and — contrary to many other JavaScript solutions — _he_ handles astral Unicode symbols just fine. [An online demo is available.](https://mothereff.in/html-entities)

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install he
```

_he_ is published as an ECMAScript module with named exports:

```js
import { decode, encode, escape, unescape } from 'he';
// Or, to use the `he.*` style shown in the examples below:
import * as he from 'he';
```

In a browser, using a `<script type="module">` and a path to the package’s `src/he.mjs`:

```html
<script type="module">
	import * as he from './node_modules/he/src/he.mjs';
</script>
```

In CommonJS code on Node.js versions that support [`require(esm)`](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require), `require('he')` returns the module namespace object, so `require('he').encode(…)` works as well.

## API

### `he.encode(text, options)`

This function takes a string of text and encodes (by default) any symbols that aren’t printable ASCII symbols and `&`, `<`, `>`, `"`, `'`, and `` ` ``, replacing them with character references.

```js
he.encode('foo © bar ≠ baz 𝌆 qux');
// → 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'
```

As long as the input string contains [allowed code points](https://html.spec.whatwg.org/multipage/parsing.html#preprocessing-the-input-stream) only, the return value of this function is always valid HTML. Any [(invalid) code points that cannot be represented using a character reference](https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides) in the input are not encoded:

```js
he.encode('foo \0 bar');
// → 'foo \0 bar'
```

However, enabling [the `strict` option](https://github.com/mathiasbynens/he#strict) causes invalid code points to throw an exception. With `strict` enabled, `he.encode` either throws (if the input contains invalid code points) or returns a string of valid HTML.

The `options` object is optional. It recognizes the following properties:

#### `useNamedReferences`

The default value for the `useNamedReferences` option is `false`. This means that `encode()` will not use any named character references (e.g. `&copy;`) in the output — hexadecimal escapes (e.g. `&#xA9;`) will be used instead. Set it to `true` to enable the use of named references.

**Note that if compatibility with older browsers is a concern, this option should remain disabled.**

```js
// Using the global default setting (defaults to `false`):
he.encode('foo © bar ≠ baz 𝌆 qux');
// → 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'

// Passing an `options` object to `encode`, to explicitly disallow named references:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	useNamedReferences: false,
});
// → 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'

// Passing an `options` object to `encode`, to explicitly allow named references:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	useNamedReferences: true,
});
// → 'foo &copy; bar &ne; baz &#x1D306; qux'
```

#### `decimal`

The default value for the `decimal` option is `false`. If the option is enabled, `encode` will generally use decimal escapes (e.g. `&#169;`) rather than hexadecimal escapes (e.g. `&#xA9;`). Beside of this replacement, the basic behavior remains the same when combined with other options. For example: if both options `useNamedReferences` and `decimal` are enabled, named references (e.g. `&copy;`) are used over decimal escapes. HTML entities without a named reference are encoded using decimal escapes.

```js
// Using the global default setting (defaults to `false`):
he.encode('foo © bar ≠ baz 𝌆 qux');
// → 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'

// Passing an `options` object to `encode`, to explicitly disable decimal escapes:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	decimal: false,
});
// → 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'

// Passing an `options` object to `encode`, to explicitly enable decimal escapes:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	decimal: true,
});
// → 'foo &#169; bar &#8800; baz &#119558; qux'

// Passing an `options` object to `encode`, to explicitly allow named references and decimal escapes:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	useNamedReferences: true,
	decimal: true,
});
// → 'foo &copy; bar &ne; baz &#119558; qux'
```

#### `encodeEverything`

The default value for the `encodeEverything` option is `false`. This means that `encode()` will not use any character references for printable ASCII symbols that don’t need escaping. Set it to `true` to encode every symbol in the input string. When set to `true`, this option takes precedence over `allowUnsafeSymbols` (i.e. setting the latter to `true` in such a case has no effect).

```js
// Using the global default setting (defaults to `false`):
he.encode('foo © bar ≠ baz 𝌆 qux');
// → 'foo &#xA9; bar &#x2260; baz &#x1D306; qux'

// Passing an `options` object to `encode`, to explicitly encode all symbols:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	encodeEverything: true,
});
// → '&#x66;&#x6F;&#x6F;&#x20;&#xA9;&#x20;&#x62;&#x61;&#x72;&#x20;&#x2260;&#x20;&#x62;&#x61;&#x7A;&#x20;&#x1D306;&#x20;&#x71;&#x75;&#x78;'

// This setting can be combined with the `useNamedReferences` option:
he.encode('foo © bar ≠ baz 𝌆 qux', {
	encodeEverything: true,
	useNamedReferences: true,
});
// → '&#x66;&#x6F;&#x6F;&#x20;&copy;&#x20;&#x62;&#x61;&#x72;&#x20;&ne;&#x20;&#x62;&#x61;&#x7A;&#x20;&#x1D306;&#x20;&#x71;&#x75;&#x78;'
```

#### `strict`

The default value for the `strict` option is `false`. This means that `encode()` will encode any HTML text content you feed it, even if it contains any symbols that cause [parse errors](https://html.spec.whatwg.org/multipage/parsing.html#preprocessing-the-input-stream). To throw an error when such invalid HTML is encountered, set the `strict` option to `true`. This option makes it possible to use _he_ as part of HTML parsers and HTML validators.

```js
// Using the global default setting (defaults to `false`, i.e. error-tolerant mode):
he.encode('\x01');
// → '&#x1;'

// Passing an `options` object to `encode`, to explicitly enable error-tolerant mode:
he.encode('\x01', {
	strict: false,
});
// → '&#x1;'

// Passing an `options` object to `encode`, to explicitly enable strict mode:
he.encode('\x01', {
	strict: true,
});
// → Parse error
```

#### `allowUnsafeSymbols`

The default value for the `allowUnsafeSymbols` option is `false`. This means that characters that are unsafe for use in HTML content (`&`, `<`, `>`, `"`, `'`, and `` ` ``) will be encoded. When set to `true`, only non-ASCII characters will be encoded. If the `encodeEverything` option is set to `true`, this option will be ignored.

```js
he.encode('foo © and & ampersand', {
	allowUnsafeSymbols: true,
});
// → 'foo &#xA9; and & ampersand'
```

#### Overriding default `encode` options globally

The global default setting can be overridden by modifying the `he.encode.options` object. This saves you from passing in an `options` object for every call to `encode` if you want to use the non-default setting.

```js
// Read the global default setting:
he.encode.options.useNamedReferences;
// → `false` by default

// Override the global default setting:
he.encode.options.useNamedReferences = true;

// Using the global default setting, which is now `true`:
he.encode('foo © bar ≠ baz 𝌆 qux');
// → 'foo &copy; bar &ne; baz &#x1D306; qux'
```

### `he.decode(html, options)`

This function takes a string of HTML and decodes any named and numerical character references in it using [the algorithm described in section 12.2.4.69 of the HTML spec](https://html.spec.whatwg.org/multipage/syntax.html#tokenizing-character-references).

```js
he.decode('foo &copy; bar &ne; baz &#x1D306; qux');
// → 'foo © bar ≠ baz 𝌆 qux'
```

The `options` object is optional. It recognizes the following properties:

#### `isAttributeValue`

The default value for the `isAttributeValue` option is `false`. This means that `decode()` will decode the string as if it were used in [a text context in an HTML document](https://html.spec.whatwg.org/multipage/syntax.html#data-state). HTML has different rules for [parsing character references in attribute values](https://html.spec.whatwg.org/multipage/syntax.html#character-reference-in-attribute-value-state) — set this option to `true` to treat the input string as if it were used as an attribute value.

```js
// Using the global default setting (defaults to `false`, i.e. HTML text context):
he.decode('foo&ampbar');
// → 'foo&bar'

// Passing an `options` object to `decode`, to explicitly assume an HTML text context:
he.decode('foo&ampbar', {
	isAttributeValue: false,
});
// → 'foo&bar'

// Passing an `options` object to `decode`, to explicitly assume an HTML attribute value context:
he.decode('foo&ampbar', {
	isAttributeValue: true,
});
// → 'foo&ampbar'
```

#### `strict`

The default value for the `strict` option is `false`. This means that `decode()` will decode any HTML text content you feed it, even if it contains any entities that cause [parse errors](https://html.spec.whatwg.org/multipage/syntax.html#tokenizing-character-references). To throw an error when such invalid HTML is encountered, set the `strict` option to `true`. This option makes it possible to use _he_ as part of HTML parsers and HTML validators.

```js
// Using the global default setting (defaults to `false`, i.e. error-tolerant mode):
he.decode('foo&ampbar');
// → 'foo&bar'

// Passing an `options` object to `decode`, to explicitly enable error-tolerant mode:
he.decode('foo&ampbar', {
	strict: false,
});
// → 'foo&bar'

// Passing an `options` object to `decode`, to explicitly enable strict mode:
he.decode('foo&ampbar', {
	strict: true,
});
// → Parse error
```

#### Overriding default `decode` options globally

The global default settings for the `decode` function can be overridden by modifying the `he.decode.options` object. This saves you from passing in an `options` object for every call to `decode` if you want to use a non-default setting.

```js
// Read the global default setting:
he.decode.options.isAttributeValue;
// → `false` by default

// Override the global default setting:
he.decode.options.isAttributeValue = true;

// Using the global default setting, which is now `true`:
he.decode('foo&ampbar');
// → 'foo&ampbar'
```

### `he.escape(text)`

This function takes a string of text and escapes it for use in text contexts in XML or HTML documents. Only the following characters are escaped: `&`, `<`, `>`, `"`, `'`, and `` ` ``.

```js
he.escape('<img src=\'x\' onerror="prompt(1)">');
// → '&lt;img src=&#x27;x&#x27; onerror=&quot;prompt(1)&quot;&gt;'
```

### `he.unescape(html, options)`

`he.unescape` is an alias for `he.decode`. It takes a string of HTML and decodes any named and numerical character references in it.

### Using the `he` binary

To use the `he` binary in your shell, simply install _he_ globally using npm:

```bash
npm install -g he
```

After that you will be able to encode/decode HTML entities from the command line:

```bash
$ he --encode 'föo ♥ bår 𝌆 baz'
f&#xF6;o &#x2665; b&#xE5;r &#x1D306; baz

$ he --encode --use-named-refs 'föo ♥ bår 𝌆 baz'
f&ouml;o &hearts; b&aring;r &#x1D306; baz

$ he --decode 'f&ouml;o &hearts; b&aring;r &#x1D306; baz'
föo ♥ bår 𝌆 baz
```

Read a local text file, encode it for use in an HTML text context, and save the result to a new file:

```bash
$ he --encode < foo.txt > foo-escaped.html
```

Or do the same with an online text file:

```bash
$ curl -sL "http://git.io/HnfEaw" | he --encode > escaped.html
```

Or, the opposite — read a local file containing a snippet of HTML in a text context, decode it back to plain text, and save the result to a new file:

```bash
$ he --decode < foo-escaped.html > foo.txt
```

Or do the same with an online HTML snippet:

```bash
$ curl -sL "http://git.io/HnfEaw" | he --decode > decoded.txt
```

See `he --help` for the full list of options.

## Support

_he_ is an ES2022 module. It works in all modern browsers and in Node.js v22+. The CLI requires Node.js v22+.

## Development

After cloning this repository, run `npm install` to install the development dependencies.

- `npm test` runs the test suite using the built-in Node.js test runner.
- `npm run coverage` prints a code coverage report.
- `npm run build` regenerates `data/*.json` from `data/entities.json` and writes the generated `src/data.mjs` module, which `src/he.mjs` imports.
- `npm run fetch` downloads the latest `entities.json`, derives the invalid code points and character reference overrides from the HTML and Infra Standards, and rebuilds. If the relevant spec prose changes, `scripts/fetch-spec.mjs` fails with an explanation instead of writing data.
- `npm run format` formats the code using [Oxfmt](https://oxc.rs/docs/guide/usage/formatter); `npm run format:check` verifies formatting.

## Acknowledgements

Thanks to [Simon Pieters](https://simon.html5.org/) ([@zcorpan](https://twitter.com/zcorpan)) for the many suggestions.

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias 'Follow @mathias on Twitter') |
| ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Mathias Bynens](https://mathiasbynens.be/)                                                                                                       |

## License

_he_ is available under the [MIT](https://mths.be/mit) license.
