import { request } from '../../request'
import { endpoints } from '../../endpoints'

export type UserInfo = {
  userId: Id
}
interface Login {
  loginName: string
  password: string
}
export const login = (data: Login) => {
  return request<UserInfo>(endpoints.login, { method: 'POST', data }).then(
    (res) => {
      return res
    }
  )
}
