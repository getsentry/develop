const visit = require("unist-util-visit");

module.exports = ({
  markdownNode,
  markdownAST,
  files,
}, {
  githubRepo,
  linkText = "Edit on GitHub"
}) => {
  const matchingFile = files.find((x) => x.absolutePath === markdownNode.fileAbsolutePath);
  if (!matchingFile) {
    return markdownAST;
  }

  let lineOffset = null;

  function getLineOffset() {
    if (lineOffset !== null) {
      return lineOffset;
    }
    lineOffset = 0;
    const match = markdownNode.rawBody.match(/^---[^\S\r\n]*$[^]*?^---[^\S\r\n]*$/m);
    if (match) {
      lineOffset = match[0].split(/\r?\n/).length;
    }
    return lineOffset;
  }

  visit(markdownAST, (node) => {
    return node && node.position && node.type === "heading";
  }, node => {
    node.children.push({
      type: "link",
      url: `https://github.com/${githubRepo}/edit/master/src/${matchingFile.sourceInstanceName}/${matchingFile.relativePath}#L${node.position.start.line + getLineOffset()}`,
      title: null,
      children: [],
      data: {
        hProperties: {
          class: "edit-on-github"
        },
        hChildren: [{
          type: "text",
          value: linkText,
        }]
      }
    });
  });

  return markdownAST;
};