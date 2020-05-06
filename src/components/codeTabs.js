import React, { useState, useContext } from "react";

// human readable versions of names
const LANGUAGES = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  html: "HTML",
  coffee: "CoffeeScript",
  powershell: "PowerShell",
  json: "JSON",
  cpp: "C++",
  csharp: "C#",
  es6: "JavaScript (ES6)",
  yml: "YAML",
  yaml: "YAML",
};

export const CodeContext = React.createContext(null);

export function makeCodeContextState() {
  return useState(null);
}

function CodeTabs({ children, hideTabBar = false }) {
  if (!Array.isArray(children)) {
    children = [children];
  } else {
    children = [...children];
  }

  children.sort((a, b) => {
    function makeKey({ language, title }) {
      return `${language || "_"}-${title || ""}`;
    }
    return makeKey(a.props).localeCompare(makeKey(b.props), ["en"], {
      sensitivity: "base",
    });
  });

  const [sharedSelection, setSharedSelection] = useContext(CodeContext);
  const [localSelection, setLocalSelection] = useState(null);

  const possibleChoices = children.map((x) => {
    const { title, language } = x.props;
    return (
      title ||
      LANGUAGES[language] ||
      (language ? language[0].toUpperCase() + language.substr(1) : "Text")
    );
  });

  const sharedSelectionChoice = sharedSelection
    ? possibleChoices.find((x) => x === sharedSelection)
    : null;
  const localSelectionChoice = localSelection
    ? possibleChoices.find((x) => x === localSelection)
    : null;

  const finalSelection =
    sharedSelectionChoice || localSelectionChoice || possibleChoices[0];

  if (localSelection !== finalSelection) {
    setLocalSelection(finalSelection);
  }

  let code = null;

  const names = possibleChoices.map((choice, idx) => {
    const isSelected = choice === finalSelection;
    if (isSelected) {
      code = children[idx];
    }

    return (
      <button
        className={isSelected ? "active" : ""}
        onClick={() => {
          setSharedSelection(choice);
          setLocalSelection(choice);
        }}
        key={idx}
      >
        {choice}
      </button>
    );
  });

  return (
    <div className="code-tabs">
      {!hideTabBar && <div class="tab-bar">{names}</div>}
      <div class="tab-content">{code}</div>
    </div>
  );
}

export default CodeTabs;
