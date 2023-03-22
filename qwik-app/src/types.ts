export type N<T> = T | null;

export type Meta = {
  page: number
  pageSize: number
  totalResults: number
}

export type NewsItemData = {
  author: N<string>
  content: N<string>
  description: N<string>
  publishedAt: N<string>
  source: {
    id: N<string>
    name: N<string>
  }
  title: N<string>
  url: N<string>
  urlToImage: N<string>
}
