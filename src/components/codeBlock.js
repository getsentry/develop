import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import copy from "copy-to-clipboard";

function CodeBlock({ filename, children }) {
  const [showCopied, setShowCopied] = useState(false);
  const codeRef = useRef(null);

  function copyCode() {
    copy(codeRef.current.innerText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1200);
  }

  return (
    <div className="code-block">
      {filename && <p class="filename">{filename}</p>}
      {showCopied ? (
        <button className="copied">Copied!</button>
      ) : (
        <button className="copy" onClick={() => copyCode()}>
          Copy
        </button>
      )}
      <div ref={codeRef}>{children}</div>
    </div>
  );
}

CodeBlock.propTypes = {
  language: PropTypes.string,
  filename: PropTypes.string,
  title: PropTypes.string,
};

export default CodeBlock;
