module.exports = ({
  markdownAST
}, {}) => {
  visit(markdownAST, "heading", node => {
    console.log(node.position);
  });

  return markdownAST;
}