import { NewsItemData } from "../types";

export const getNewsItemData = (data: NewsItemData) => {
  const {
    author,
    content,
    description,
    publishedAt,
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