const isDev = process.env.NODE_ENV === 'development'
const isOnlineTest = process.env.NODE_ENV === 'online_test'

const devOrigin = '192.168.0.128:8002'
const onlineTestOrigin = 'www.t-han.com'
const prodOrigin = 'www.ibimglobal.com'

export const endpoints = Object.freeze({
  dev: `//${devOrigin}/IBIM`,
  test: `https://${onlineTestOrigin}/IBIM`,
  prod: `https://${prodOrigin}/IBIM`,
} as const)

const env = isDev ? 'dev' : isOnlineTest ? 'test' : 'prod'

const services = {
  service: endpoints[env],
}

export const globalConfig = {
  get ___serviceApi() {
    return services.service
  },
  get ___isDev() {
    return isDev
  },
  get ___isOnlineTest() {
    return isOnlineTest
  },
  get ___isTesting() {
    return this.___isDev || this.___isOnlineTest
  },
}
