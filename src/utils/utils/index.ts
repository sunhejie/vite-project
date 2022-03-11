import { isBoolean, isFunction, isObject } from '@vueuse/core'
import { isNullable } from './is'
import { convertObjName } from './convertObjName'
import { logError } from './logError'
export const utils = {
  isNullable,
  convertObjName,
  isBoolean,
  isFunction,
  isObject,
  logError,
}
