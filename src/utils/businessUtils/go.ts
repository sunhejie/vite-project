import { globalConfig } from 'config'
import qs from 'qs'
import { paths } from 'router/paths'
import { storage } from 'utils/misc/storage'
import { utils } from '../utils'

/**
 * 跳转到登录页
 */
export const goToLogin = (query?: unknown) => {
  storage.clearAll()
  utils.reloadPage(getUrl(paths.login, query))
}

/**
 * 跳转到首页
 */
export const goToHomePage = (query?: unknown) => {
  utils.reloadPage(getUrl(paths.home, query))
}

function getUrl(path: string, query?: unknown) {
  return `${globalConfig.___siteUrl}${path}${
    utils.isObject(query) ? `?${qs.stringify(query, { encode: true })}` : ''
  }`
}
