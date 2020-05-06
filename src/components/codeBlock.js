import React from "react";
import PropTypes from "prop-types";

class CodeBlock extends React.Component {
  render() {
    return (
      <div className="code-block">
        {this.props.filename && <p class="filename">{this.props.filename}</p>}
        {this.props.children}
      </div>
    );
  }
}

CodeBlock.propTypes = {
  language: PropTypes.string,
  filename: PropTypes.string,
  title: PropTypes.string,
};

export default CodeBlock;
