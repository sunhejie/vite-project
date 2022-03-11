export function getFilenameFromHeader(headers?: NormalObj) {
  const fileNameHeader = headers?.['content-disposition']
  if (fileNameHeader) {
    return decodeURIComponent(
      fileNameHeader.replace('attachment;filename=', '')
    )
  }
}
