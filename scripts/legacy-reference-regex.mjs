import legacyReferences from '../data/decode-legacy-named-references.json' with { type: 'json' };

export const regexLegacyReferenceSource = `&(${legacyReferences.join('|')})(?!;)([=a-zA-Z0-9]?)`;
