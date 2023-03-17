export const getNewsData = data => {
  const {
    author,
    content,
    description,
    publishedAt = "No date",
    source = {
      id: null,
      name: "Unknown source"
    },
    title = null,
    url = null,
    urlToImage = '/favicon.png',
  } = data || {};

  return {
    author: author || "No author", 
    content, 
    description, 
    publishedAt: publishedAt || 'No Date', 
    source, title, url, urlToImage
  }
}
