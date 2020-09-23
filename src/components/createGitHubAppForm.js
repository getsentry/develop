import React, {useState, useRef} from 'react';

const CreateGitHubAppForm = ({url, defaultOrg, defaultUrlPrefix, ...props}) => {
  const [orgSlug, setOrgSlug] = useState(defaultOrg);
  const [urlPrefix, setUrlPrefix] = useState(defaultUrlPrefix);
  const renderedUrl = url
    .replace(/:org(?=\W)/g, orgSlug)
    .replace(/:url-prefix(?=\W)/g, encodeURIComponent(urlPrefix));

  // This is to avoid in case multiple instances of this component are used on the page
  const randomCounter = Math.random();

  const orgSlugRef = useRef();
  const urlPrefixRef = useRef();

  return (
    <table>
      <tr>
        <td>
          <label htmlFor={`gh-org-slug-${randomCounter}`}>
            GitHub Org Slug:
          </label>
        </td>
        <td>
          <input
            id={`gh-org-slug-${randomCounter}`}
            value={orgSlug}
            ref={orgSlugRef}
            size={30}
            onChange={() => setOrgSlug(orgSlugRef.current.value)}
          />
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor={`sentry-url-prefix-${randomCounter}`}>
            Sentry <code>url-prefix</code>:
          </label>
        </td>
        <td>
          <input
            id={`sentry-url-prefix-${randomCounter}`}
            value={urlPrefix}
            ref={urlPrefixRef}
            size={30}
            onChange={() => setUrlPrefix(urlPrefixRef.current.value)}
          />
        </td>
      </tr>
      <tr>
        <td colSpan="2" align="right">
          {' '}
          <button
            type="button"
            onClick={() => window.open(renderedUrl, '_blank', 'noopener')}
          >
            Create GitHub App
          </button>
        </td>
      </tr>
    </table>
  );
};

export default CreateGitHubAppForm;
