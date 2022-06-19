import axios from 'axios'
import { SUBGRAPH_URL } from '@constants/index'

export async function subgraphQuery(query: string) {
  try {
    const response = await axios.post(SUBGRAPH_URL, {
      query,
    })
    if (response.data.errors) {
      console.error(response.data.errors)
      throw new Error(`Error making subgraph query ${response.data.errors}`)
    }
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const getEllipsisTxt = (str: string, n = 6): string => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return ''
}
