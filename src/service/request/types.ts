import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CANCEL_KEY } from './cancelRequests'

interface AxiosExtraConfig {
  skipResCheck?: boolean
  [CANCEL_KEY]?: string
}

export type RequestConfig = AxiosRequestConfig & AxiosExtraConfig

export type ResponseConfig<T = any> = Omit<
  AxiosResponse<APIResult<T>>,
  'config'
> & { config: RequestConfig }

export type APIResult<T = any> = {
  code: string
  message: string
  result: T
}
