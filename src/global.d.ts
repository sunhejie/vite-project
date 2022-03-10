type StringOrNumber = string | number

type Id = StringOrNumber

type NormalObj = Record<keyof any, any>

// 用于convertObjName这个工具函数中，提取对应的key的值为新的对象的key，并保留类型
type RecordWithSwappedKey<T, U extends Partial<Record<keyof T, any>>> = Omit<
  T,
  keyof U
> & {
  -readonly [K in Extract<keyof U, keyof T> as U[K]]: K extends keyof T
    ? T[K]
    : K
}
