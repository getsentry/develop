// Disable prefetching altogether so our bw is not destroyed.
// If this turns out to hurt performance significantly, we can
// try out https://www.npmjs.com/package/gatsby-plugin-guess-js
// with data from the prior 1-2 weeks.
export const disableCorePrefetching = () => true;

