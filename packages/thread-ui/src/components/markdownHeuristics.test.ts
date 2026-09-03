import { describe, expect, it } from 'vitest';

import { hasLikelyMarkdownSyntax } from './markdownHeuristics';

describe('hasLikelyMarkdownSyntax', () => {
  it('recognizes inline and display math', () => {
    expect(hasLikelyMarkdownSyntax('The result is $E = mc^2$.')).toBe(true);
    expect(hasLikelyMarkdownSyntax('$$\n\\int_0^1 x^2 dx\n$$')).toBe(true);
  });

  it('does not treat ordinary currency as math', () => {
    expect(hasLikelyMarkdownSyntax('The build costs $5 per run.')).toBe(false);
  });
});
