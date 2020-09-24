import React, { useState, useRef } from "react";

const MAX_COMPONENTS_ON_PAGE = 100;

const CreateGitHubAppForm = ({
  url,
  defaultOrg,
  defaultUrlPrefix,
  ...props
}) => {
  const [orgSlug, setOrgSlug] = useState(defaultOrg);
  const [urlPrefix, setUrlPrefix] = useState(defaultUrlPrefix);
  const renderedUrl = url
    .replace(/:org(?=\W)/g, orgSlug)
    .replace(/:url-prefix(?=\W)/g, encodeURIComponent(urlPrefix));

  const labelStyle = {
    margin: "0.5rem",
  };

  // This is to avoid in case multiple instances of this component are used on the page
  const randomCounter = Math.round(Math.random() * MAX_COMPONENTS_ON_PAGE);

  const orgSlugRef = useRef();
  const urlPrefixRef = useRef();

  return (
    <table>
      <tr>
        <td align="right">
          <label htmlFor={`gh-org-slug-${randomCounter}`} style={labelStyle}>
            GitHub Org Slug
          </label>
        </td>
        <td>
          <input
            id={`gh-org-slug-${randomCounter}`}
            value={orgSlug}
            ref={orgSlugRef}
            size={30}
            className="form-control"
            onChange={() => setOrgSlug(orgSlugRef.current.value)}
          />
        </td>
      </tr>
      <tr>
        <td align="right" className="content-flush-bottom">
          <label
            htmlFor={`sentry-url-prefix-${randomCounter}`}
            style={labelStyle}
          >
            Sentry <code>url-prefix</code>
          </label>
        </td>
        <td>
          <input
            id={`sentry-url-prefix-${randomCounter}`}
            value={urlPrefix}
            ref={urlPrefixRef}
            size={30}
            className="form-control"
            onChange={() => setUrlPrefix(urlPrefixRef.current.value)}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="2" align="right">
          {" "}
          <button
            type="button"
            className="btn btn-primary d-block d-inline-block-md"
            onClick={() => window.open(renderedUrl, "_blank", "noopener")}
          >
            Create GitHub App
          </button>
        </td>
      </tr>
    </table>
  );
};

export default CreateGitHubAppForm;
