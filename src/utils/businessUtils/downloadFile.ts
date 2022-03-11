import axios from 'axios'
import { goToLogin } from './go'

/**
 * 用于下载文件
 * @param blobOrUrl - 后端传回的blob数据
 * @param getFileName - 自定义的文件名函数
 */
export async function downloadFile(
  blobOrUrl: Blob | string,
  getFileName: () => string | void
) {
  let aElem = document.createElement('a')

  const url = window.URL.createObjectURL(await getBlob())

  aElem.setAttribute('href', url)

  const fileName = getFileName()
  if (!fileName) return goToLogin() // 说明是json，也就是401token过期

  aElem.setAttribute('download', fileName)
  aElem.setAttribute('target', '_blank')
  aElem.click()

  // @ts-ignore
  aElem = null
  URL.revokeObjectURL(url)

  async function getBlob() {
    let blob = blobOrUrl
    if (typeof blobOrUrl === 'string') {
      blob = (
        await axios.get(blobOrUrl, { responseType: 'blob' }).catch(() => {
          let blobParams: [BlobPart[], BlobPropertyBag] = [
            [blobOrUrl],
            { type: 'text/plain;charset=utf-8' /* 纯文本 */ },
          ]

          if (isStartedWithProtocol(blobOrUrl)) {
            blobParams = [
              [getIframeHTML(blobOrUrl)],
              { type: 'text/html' /* iframe */ },
            ]
          }

          return { data: new window.Blob(...blobParams) }
        })
      ).data
    }

    return blob as Blob
  }
}

function isStartedWithProtocol(str: string) {
  return /^https?:\/\//.test(str)
}

function getIframeHTML(url: string) {
  return `
  <html>
    <body style="margin:0px;">
      <iframe src=${url} frameborder="0" style="height:100vh;width:100vw;border:none;margin:0px;"></iframe>
    </body>
  </html>
  `
}
