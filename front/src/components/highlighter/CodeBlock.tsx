import { CodeComponent } from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styled from "styled-components";

export const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <Code className={className}>{children}</Code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return (
    <SyntaxHighlighter
      style={tomorrow}
      language={lang}
      children={String(children).replace(/\n$/, "")}
    />
  );
};

const Code = styled.code`
  padding: 0.2em 0.4em;
  background: #eff3f8;
  border-radius: 4px;
  vertical-align: 0.08em;
`;
