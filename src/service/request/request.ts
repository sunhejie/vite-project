import axios from 'axios'
import { globalConfig } from 'config'
import { endpoints } from '../endpoints'
import { loadInterceptors } from './interceptors'
import { APIResult, RequestConfig } from './types'

type RequestMethod = <T = unknown>(
  url: typeof endpoints[keyof typeof endpoints],
  config?: RequestConfig
) => Promise<APIResult<T>>

export const axiosInstance = axios.create({
  baseURL: globalConfig.___serviceApi,
})

// 加载拦截器
loadInterceptors(axiosInstance)

export const request: RequestMethod = <T>(
  url: Parameters<RequestMethod>[0],
  { ...rest } = {}
) => {
  return axiosInstance(url, {
    ...rest,
  } as RequestConfig) as unknown as Promise<APIResult<T>>
}
