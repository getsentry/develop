import React, { useState, useRef } from "react";
import { Link } from "gatsby";

import ExternalLink from "./externalLink";

const GitHubOrgLink = ({ url, defaultOrg, children, ...props }) => {
    const [orgSlug, setOrgSlug] = useState(defaultOrg);
    const renderedUrl = url.replace(/:org(?=\W)/g, `${orgSlug}`);
    const orgSlugRef = useRef();

    const style = {
        border: 0,
        borderBottom: '1px solid',
        padding: 0,

    };

    return (<>
        <a href={renderedUrl} {...props}>
            {children}
        </a><input type="text" value={orgSlug} ref={orgSlugRef} style={style} size={orgSlug?.length ?? 10} onChange={() => setOrgSlug(orgSlugRef.current.value)} />
    </>);
};

export default GitHubOrgLink;
