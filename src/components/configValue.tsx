import React from "react";

type Props = {
  name: string,
  location: string,
  children: JSX.Element,
}

const getDescriptiveLocation = (location: string): JSX.Element => {
  switch (location) {
    case "env":
      return <React.Fragment>in System Environment</React.Fragment>;
    case "yaml":
      return <React.Fragment>in <code>config.yaml</code></React.Fragment>
    case "python":
      return <React.Fragment>in <code>sentry.conf.py</code></React.Fragment>
    case "cli":
      return <React.Fragment>on the command line</React.Fragment>;
    default:
      throw new Error('Invalid location')
  }
}

export default ({ name, location, children }: Props): JSX.Element => {
  return (
    <div style={{marginBottom: "2rem"}}>
      <h4 style={{marginBottom: 0, fontWeight: "bold"}}><code>{name}</code></h4>
      <p><small>Declared {getDescriptiveLocation(location)}</small></p>
      {children}
    </div>
  )
}
