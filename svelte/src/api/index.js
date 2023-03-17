import axios from "axios";

const baseURL = "https://newsapi.org/v2/";

const instance = axios.create({
  headers: {
    'X-Api-Key' : `7c23564cc28a44a6abc525d546debcd9`
  },
  baseURL: baseURL
})

export const api = {
  getEverething: async ({ q, pageSize = 20, page = 1 } = { }) => {
    try {
      const response = await instance.get('everything', { params: {
        q,
        pageSize,
        page
      }})

      return {
        data: response.data
      }
    } catch (err) {
      return {
        error: err.message
      }
    }
  }
}