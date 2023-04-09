import axios from "axios";
import { NewsItemData } from "../types";

const baseURL = "https://newsapi.org/v2/";

const instance = axios.create({
  headers: {
    'X-Api-Key' : `7c23564cc28a44a6abc525d546debcd9`
  },
  baseURL: baseURL
})

export type SearchNewsRequest = {
  q?: string,
  pageSize?: number,
  page?: number
} | undefined

export type SearchNewsResponse = {
  articles: NewsItemData[],
  totalResults: number
}

export const api = {
  getEverething: async ({ q, pageSize = 20, page = 1 } : SearchNewsRequest = {}) : Promise<{
    data?: SearchNewsResponse,
    error?: string
  }>=> {
    try {
      const response = await instance.get('everything', { params: {
        q,
        pageSize,
        page
      }})

      return {
        data: response.data
      }
    } catch (err: any) {
      return {
        error: err.message
      }
    }
  }
}