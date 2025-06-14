import type { MDXComponents } from "mdx/types";
import { CopyButton } from "./components/copy-button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base font-bold">{children}</h4>,
    h5: ({ children }) => <h5 className="text-sm font-bold">{children}</h5>,
    h6: ({ children }) => <h6 className="text-xs font-bold">{children}</h6>,
    p: ({ children }) => <p className="text-neutral-400">{children}</p>,
    li: ({ children }) => <li className="text-neutral-400">{children}</li>,
    ul: ({ children }) => <ul className="text-neutral-400">{children}</ul>,
    ol: ({ children }) => <ol className="text-neutral-400">{children}</ol>,
    blockquote: ({ children }) => (
      <blockquote className="text-neutral-400">{children}</blockquote>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium hover:underline"
        style={{
          color: "#3b82f6",
        }}
      >
        {children}
      </a>
    ),
    pre: ({ children }) => {
      const code = children?.props?.children || "";
      return (
        <div className="relative group">
          <pre
            className="text-white p-4 rounded-lg overflow-x-auto my-4 shadow-lg"
            style={{
              backgroundColor: "#1e1e1e",
            }}
          >
            {children}
          </pre>
          <CopyButton code={code} />
        </div>
      );
    },
    code: ({ children, className }) => {
      // For inline code
      if (!className) {
        return (
          <code className="bg-gray-700 text-white px-1.5 py-0.5 rounded text-sm">
            {children}
          </code>
        );
      }
      // For code blocks
      return (
        <code className={`block ${className} text-sm leading-relaxed`}>
          {children}
        </code>
      );
    },
    ...components,
  };
}
