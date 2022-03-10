import axios, { Canceler } from 'axios'
import { utils } from 'utils'
import { RequestConfig } from './types'

export const CANCEL_MESSAGE = 'Request canceled.'
export const CANCEL_KEY = Symbol('__cancel_id__')

interface CancelItem {
  canceler: Canceler
}

const cancelMap = new Map<string, CancelItem>()

const add = (config: RequestConfig) => {
  let canceler: Canceler | undefined

  config.cancelToken = new axios.CancelToken((c) => (canceler = c))

  if (canceler) cancelMap.set(config[CANCEL_KEY]!, { canceler })
}
const remove = (id: string) => cancelMap.delete(id)
const clear = () => cancelMap.clear()
const cancel = (id?: string) => {
  if (!utils.isNullable(id)) {
    cancelRequest(cancelMap.get(id))
    remove(id)
  } else {
    ;[...cancelMap.values()].forEach(cancelRequest)
    clear()
  }
}

export const cancelRequests = {
  add,
  cancel,
  clear,
  queue: cancelMap,
  remove,
}

function cancelRequest(item?: CancelItem) {
  item?.canceler(CANCEL_MESSAGE)
}
