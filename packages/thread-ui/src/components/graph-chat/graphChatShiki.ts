import type { HighlighterCore } from 'shiki/core';

let graphChatHighlighterPromise: Promise<HighlighterCore> | null = null;

export function getGraphChatHighlighter() {
  graphChatHighlighterPromise ??= Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
    import('shiki/themes/ayu-light.mjs'),
    import('shiki/themes/ayu-dark.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/jsx.mjs'),
    import('shiki/langs/python.mjs'),
    import('shiki/langs/json.mjs'),
    import('shiki/langs/bash.mjs'),
    import('shiki/langs/shellscript.mjs'),
    import('shiki/langs/yaml.mjs'),
    import('shiki/langs/toml.mjs'),
    import('shiki/langs/markdown.mjs'),
    import('shiki/langs/html.mjs'),
    import('shiki/langs/css.mjs'),
    import('shiki/langs/sql.mjs'),
    import('shiki/langs/csv.mjs'),
  ]).then(
    ([
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      ayuLight,
      ayuDark,
      javascript,
      typescript,
      tsx,
      jsx,
      python,
      json,
      bash,
      shellscript,
      yaml,
      toml,
      markdown,
      html,
      css,
      sql,
      csv,
    ]) =>
      createHighlighterCore({
        engine: createJavaScriptRegexEngine(),
        themes: [ayuLight.default, ayuDark.default],
        langs: [
          javascript.default,
          typescript.default,
          tsx.default,
          jsx.default,
          python.default,
          json.default,
          bash.default,
          shellscript.default,
          yaml.default,
          toml.default,
          markdown.default,
          html.default,
          css.default,
          sql.default,
          csv.default,
        ],
      }),
  );

  return graphChatHighlighterPromise;
}
