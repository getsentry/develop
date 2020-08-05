const { readFileSync } = require('fs');
const { quicktype, InputData, JSONSchemaInput, JSONSchemaStore } = require("@untitaker/quicktype-core-with-markdown");

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  let content;
  let parsedContent;
  try {
    const rawData = readFileSync('./src/relay/relay-general/tests/snapshots/test_fixtures__event_schema.snap', {encoding: "utf8"});
    content = rawData.split("\n").slice(4).join("\n");
    parsedContent = JSON.parse(content);
  } catch (e) {
    content = null;
    parsedContent = null;
  }

  createNode({
    content,
    name: 'Event',
    id: 'relay-event', // human-readable ID for referencing in MDX component
    parent: null,
    children: [],
    internal: {
      type: `JsonSchema`,
      mediaType: 'application/schema+json',
      content,
      contentDigest: createContentDigest(parsedContent),
    },
  });
};



function quicktypeJSONSchema(targetLanguage, typeName, jsonSchemaString) {
  const schemaInput = new JSONSchemaInput(new JSONSchemaStore());
  return schemaInput.addSource({ name: typeName, schema: jsonSchemaString })
  .then(_ => {
    const inputData = new InputData();
    inputData.addInput(schemaInput);

    return quicktype({
      inputData,
      lang: targetLanguage,
    });
  });
}

exports.onCreateNode = async ({ actions, createNodeId, node, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  if (node.internal.mediaType !== `application/schema+json`) {
    return;
  }

  const { lines } = await quicktypeJSONSchema("markdown", node.name, node.content);

  const child = {
    lines,
    content: lines.join("\n"),
    id: createNodeId(`${node.id}-markdown`),
    parent: node.id,
    internal: {
      content: lines.join("\n"),
      mediaType: 'text/markdown',
      contentDigest: createContentDigest(lines),
      type: `JsonSchemaMarkdown`
    }
  };

  createNode(child);
  createParentChildLink({ parent: node, child });
};
