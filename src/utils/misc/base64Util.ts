export const base64Util = {
  encode(str: StringOrNumber) {
    return window.btoa(String(str))
  },
  decode(str: StringOrNumber) {
    return window.atob(String(str))
  },
}
