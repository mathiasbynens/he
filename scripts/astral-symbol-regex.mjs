import regenerate from 'regenerate';

export const regexAstralSymbol = regenerate()
	.addRange(0x010000, 0x10ffff)
	.toString();
