import { downloadFile } from './downloadFile'
import { getFilenameFromHeader } from './getFilenameFromHeader'
import { goToHomePage, goToLogin } from './go'
import { notifyInDevelopment } from './notifyInDevelopment'

export const businessUtils = {
  downloadFile,
  goToLogin,
  goToHomePage,
  getFilenameFromHeader,
  notifyInDevelopment,
}
