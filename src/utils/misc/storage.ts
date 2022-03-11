import { utils } from '../utils'

const ls = window.localStorage
const ss = window.sessionStorage

export const LS_STORAGE_KEY = btoa('ls_storage_key')
export const SS_STORAGE_KEY = btoa('ss_storage_key')

const addKey = (storage: Storage, key: string) => {
  const keys = getKeys(storage)

  if (keys.includes(key)) return

  keys.push(key)

  storage.setItem(getStorageKey(storage), JSON.stringify(keys))
}
const removeKey = (storage: Storage, key: string) => {
  let keys = getKeys(storage)

  keys = keys.filter((_key) => _key !== key)

  storage.setItem(getStorageKey(storage), JSON.stringify(keys))
}
const clearKey = (storage: Storage) => {
  storage.removeItem(getStorageKey(storage))
}
const getKeys = (storage: Storage) => {
  return get(storage, getStorageKey(storage), [] as string[])
}

function getStorageKey(storage: Storage) {
  return storage === ls ? LS_STORAGE_KEY : SS_STORAGE_KEY
}

function get(storage: Storage, key: string): unknown
function get<T>(storage: Storage, key: string, fallbackValue: T): T
function get<T>(storage: Storage, key: string, fallbackValue?: T) {
  let value: T | undefined

  utils.callWithErrorCatch(() => {
    const v = storage.getItem(key)

    if (v == null) {
      if (fallbackValue) {
        value = fallbackValue
        set(storage, key, value)
      }
      return
    }

    value = JSON.parse(v)
  })

  return value
}

const set = (
  storage: Storage,
  key: string,
  value: any,
  cb?: (error: any) => void
) => {
  utils.callWithErrorCatch(
    () => {
      storage.setItem(key, JSON.stringify(value))
      addKey(storage, key)
    },
    (error) => {
      cb?.(error)
    }
  )
}

const remove = (storage: Storage, key: string) => {
  storage.removeItem(key)
  removeKey(storage, key)
}

const clear = (storage: Storage) => {
  forEach(storage, (_, key) => remove(storage, key))
  clearKey(storage)
}

const forEach = (
  storage: Storage,
  cb: (value: any, key: string, idx: number) => void
) => {
  const keys = getKeys(storage)

  if (!keys.length) return

  keys.forEach((key, idx) => {
    const value = get(storage, key)

    cb(value, key, idx)
  })
}

const clearAll = () => {
  storage.clear()
  storage.session.clear()
}

type GET = <T>(
  key: string,
  fallbackValue?: T,
  cb?: (error: any) => void
) => T | undefined

const session = {
  get: get.bind(null, ss) as GET,
  set: set.bind(null, ss),
  remove: remove.bind(null, ss),
  clear: clear.bind(null, ss),
  forEach: forEach.bind(null, ss),
}

export const storage = {
  get: get.bind(null, ls) as GET, // bind后泛型消失了，所以使用类型断言
  set: set.bind(null, ls),
  remove: remove.bind(null, ls),
  clear: clear.bind(null, ls),
  forEach: forEach.bind(null, ls),
  session,
  clearAll,
}
