import React from "react"
import remark from 'remark';
import html from 'remark-html';
import { quicktype, InputData, JSONSchemaInput, JSONSchemaStore } from "quicktype/dist/quicktype-core";

const mdProcessor = remark()
  .use(html);

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

const JsonSchema = ({name, url}) => {
  const [html, setHtml] = React.useState(null);

  React.useEffect(() => {
    fetch(url)
      .then(response => response.text())
      .then(schemaString => quicktypeJSONSchema("markdown", name, schemaString))
      .then(({ lines }) => mdProcessor.process(lines.join("\n")))
      .then(html => setHtml(html))
  }, [name, url]);

  if (!html) {
    return "loading";
  }

  return (<div dangerouslySetInnerHTML={{ __html: html }}></div>);
}

export default JsonSchema;
