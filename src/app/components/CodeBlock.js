const codeLanguageLabels = {
  html: "HTML",
  js: "JavaScript",
  python: "Python",
};

export default function CodeBlock({ language, code, label }) {
  const languageLabel = label || codeLanguageLabels[language] || language;

  return (
    <pre
      className={`code-block code-block--${language} code-block--labeled`}
      data-lang={languageLabel}
    >
      <code dangerouslySetInnerHTML={{ __html: code }} />
    </pre>
  );
}
