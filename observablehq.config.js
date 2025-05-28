// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Lausannuaire",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Sections",
      pages: [
        // {name: "Dashboard", path: "/example-dashboard"},
        {name: "Lausanne Means", path: "/lausanne-means"},
        {name: "Lausanne New York Paris Means", path: "/lausanne-ny-paris-means"},
        // {name: "Report", path: "/example-report"},
        // {name: "Weather", path: "/weather"},
        {name: "New York 1885", path: "/newyork-1885"},
        {name: "Paris 1885", path: "/paris-1885"},
        {name: "Lausanne 1885", path: "/lausanne-1885"},
        {name: "Lausanne 1901", path: "/lausanne-1901"},
        {name: "Lausanne 1923", path: "/lausanne-1923"},
        {name: "Lausanne 1951", path: "/lausanne-1951"},
        // {name: "Presentation", path: "/_file/data/presentation.pdf"},
      ]
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "light", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
