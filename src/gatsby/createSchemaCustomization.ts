export default ({actions: {createTypes}}) => {
  const typeDefs = `
    type PageContext {
      title: String
      keywords: [String]
      draft: Boolean
      description: String
      excerpt: String
      noindex: Boolean
      notoc: Boolean
      sidebar_order: Int
      sidebar_title: String
    }

    type SitePage implements Node {
      context: PageContext
    }

    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
  
    type MdxFrontmatter {
      title: String
      sidebar_order: Int
      sidebar_title: String
      draft: Boolean
      noindex: Boolean
      notoc: Boolean
      keywords: [String]
      description: String
    }
  `;

  createTypes(typeDefs);
};
