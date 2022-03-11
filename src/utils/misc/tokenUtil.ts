import { storage } from './storage'

const TOKEN_KEY = btoa((0.345623634564).toString(16).slice(2))

const get = () => storage.get<string>(TOKEN_KEY)

const set = async (token: string) => {
  token = token.trim()

  if (!token) return

  storage.set(TOKEN_KEY, token)
}

const remove = () => storage.remove(TOKEN_KEY)

export const tokenUtil = { get, set, remove }
