import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { endpoints, globalConfig } from 'config'
import { router } from 'router'
import { paths } from 'router/paths'
import { businessUtils, notifier, storage, tokenUtil, utils } from 'utils'
import { RequestConfig, ResponseConfig } from './types'
import { cancelRequests, CANCEL_KEY, CANCEL_MESSAGE } from './cancelRequests'

export const enum apiCodes {
  success = 200,
  tokenError = 401,
}

const unknownErrorMessage = '未知错误，请联系管理员'
const errorMessage = {
  'Network Error': '网络错误, 请稍后再试',
  'Request failed with status code 500': '服务器错误，请稍后再试',
} as const

export const loadInterceptors = (axiosInstance: AxiosInstance) => {
  protectProdUrl(axiosInstance)
  axiosInstance.interceptors.request.use(handleReq, handleReqError)
  axiosInstance.interceptors.response.use(handleRes, handleResError)
}

function handleReq(config: RequestConfig) {
  config.headers = { token: tokenUtil.get() ?? '' }

  if (!utils.isNullable(config[CANCEL_KEY])) {
    cancelRequests.add(config)
    deleteCancelIdIfExist(config)
  }

  return config
}

function handleReqError(err: unknown) {
  notifier.error(
    utils.isObject(err) && 'message' in err
      ? (err as { message: string }).message
      : unknownErrorMessage
  )
  return Promise.reject(err)
}

function handleRes(_config: ResponseConfig) {
  const { data, config } = _config

  if (config.skipResCheck) return _config

  if (+data.code === apiCodes.success) {
    return data
  } else {
    handleAPIError(data as any)
    return Promise.reject(data.message)
  }
}

function handleResError(err: unknown) {
  if (utils.isObject(err) && 'message' in err) {
    const error = err as { message: string }

    if (error.message === CANCEL_MESSAGE) {
      utils.logError(error.message)
      return {}
    }

    notifier.error(
      errorMessage[error.message as keyof typeof errorMessage] ??
        (error.message || unknownErrorMessage)
    )
  }

  return Promise.reject(err)
}

function protectProdUrl(axiosInstance: AxiosInstance) {
  if (globalConfig.___isTesting) {
    axiosInstance.interceptors.request.use(checkIsProdAddress)
  }
  // @ts-ignore
  else checkIsProdAddress = null
}

function checkIsProdAddress(config: AxiosRequestConfig) {
  if (config.baseURL?.includes(endpoints.prod)) {
    throw Error('开发环境下不允许使用线上环境地址')
  }
  return config
}

async function handleAPIError(data: {
  code: Exclude<apiCodes, apiCodes.success>
  message?: string
}) {
  switch (+data.code) {
    case apiCodes.tokenError:
      return handleTokenError()
    default:
      notifier.error(data.message || unknownErrorMessage)
      break
  }
}

export function handleTokenError() {
  notifier.error('登陆超时', () => {
    if (router.currentRoute.value.path !== paths.login) {
      const fullPath = router.currentRoute.value.fullPath
      businessUtils.goToLogin({ redirect: fullPath })
    }
  })

  storage.clearAll()
}

function deleteCancelIdIfExist(config: RequestConfig) {
  if (!utils.isNullable(config.data?.[CANCEL_KEY]))
    delete config.data[CANCEL_KEY]
  if (!utils.isNullable(config.params?.[CANCEL_KEY]))
    delete config.params[CANCEL_KEY]
}
