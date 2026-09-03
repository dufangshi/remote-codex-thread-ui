// src/components/graph-workspace/GraphResizablePanels.tsx
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx } from "react/jsx-runtime";
function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: classNames(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
function ResizablePanel({
  ...props
}) {
  return /* @__PURE__ */ jsx(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: classNames(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle ? /* @__PURE__ */ jsx("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsx(GripVerticalIcon, { className: "size-2.5" }) }) : null
    }
  );
}

// src/components/graph-ui/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/graph-ui/Button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx2(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/graph-chat/graphChatShiki.ts
var graphChatHighlighterPromise = null;
function getGraphChatHighlighter() {
  graphChatHighlighterPromise ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/themes/ayu-light.mjs"),
    import("shiki/themes/ayu-dark.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/json.mjs"),
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/shellscript.mjs"),
    import("shiki/langs/yaml.mjs"),
    import("shiki/langs/toml.mjs"),
    import("shiki/langs/markdown.mjs"),
    import("shiki/langs/html.mjs"),
    import("shiki/langs/css.mjs"),
    import("shiki/langs/sql.mjs"),
    import("shiki/langs/csv.mjs"),
    import("shiki/langs/ruby.mjs"),
    import("shiki/langs/rust.mjs"),
    import("shiki/langs/go.mjs"),
    import("shiki/langs/java.mjs"),
    import("shiki/langs/c.mjs"),
    import("shiki/langs/cpp.mjs"),
    import("shiki/langs/csharp.mjs"),
    import("shiki/langs/xml.mjs")
  ]).then(
    ([
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      ayuLight,
      ayuDark,
      javascript,
      typescript,
      tsx,
      jsx3,
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
      ruby,
      rust,
      go,
      java,
      c,
      cpp,
      csharp,
      xml
    ]) => createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      themes: [ayuLight.default, ayuDark.default],
      langs: [
        javascript.default,
        typescript.default,
        tsx.default,
        jsx3.default,
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
        ruby.default,
        rust.default,
        go.default,
        java.default,
        c.default,
        cpp.default,
        csharp.default,
        xml.default
      ]
    })
  );
  return graphChatHighlighterPromise;
}

export {
  cn,
  Button,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  getGraphChatHighlighter
};
