import { notification } from 'ant-design-vue'
import { NotificationArgsProps } from 'ant-design-vue/lib/notification'
import { VueNode } from 'ant-design-vue/lib/_util/type'
import debounce from 'lodash.debounce'
import { VNodeTypes } from 'vue'
import { utils } from '../utils'

type NotifyFn = (
  message: VNodeTypes,
  onClose?: VoidFunction | Options,
  options?: Options
) => void
type NotifyType = 'error' | 'success' | 'info'
type Options = Partial<NotificationArgsProps>

export const DEFAULT_NOTIFY_DURATION = 1.5
export const DEFAULT_ON_CLOSE_INVOKE_TIME = DEFAULT_NOTIFY_DURATION * 1000
export const NOTIFY_DELAY = 200 // 提醒延迟的时间，主要是为了避免在极短的时间触出多条提示

const error = baseNotifier('error')
const success = baseNotifier('success')
const info = baseNotifier('info')

/**
 * 右侧提示框
 * @param message - 提示信息，可传入vnode类型
 * @param onClose - 提示关闭后的回调函数，可选
 * @param options.duration - 提示持续时间，单位为秒
 */
export const notifier = {
  error,
  success,
  info,
}

function baseNotifier(notifyType: NotifyType) {
  return debounce(notify.bind(null, notifyType), NOTIFY_DELAY) as NotifyFn
}

function notify(
  notifyType: NotifyType,
  message: VNodeTypes,
  options?: Options
): void
function notify(
  notifyType: NotifyType,
  message: VNodeTypes,
  onClose?: VoidFunction,
  options?: Options
): void
/**
 * 右侧提示框
 * @param notifyType
 * @param message - 提示信息，可传入vnode类型
 * @param onClose - 提示关闭后的回调函数，可选
 * @param options.duration - 提示持续时间，单位为秒
 */
function notify(
  notifyType: NotifyType,
  message: VNodeTypes,
  onClose?: VoidFunction | Options,
  options?: Options
) {
  const finalOptions: Options = {
    duration: DEFAULT_NOTIFY_DURATION,
    top: '64px',
  }

  if (utils.isObject(onClose)) {
    Object.assign(finalOptions, onClose)
  } else {
    Object.assign(finalOptions, options)
  }

  notification[notifyType]({ message: message as VueNode, ...finalOptions })
  utils.isFunction(onClose) &&
    setTimeout(onClose, finalOptions.duration! * 1000)
}
