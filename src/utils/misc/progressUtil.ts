import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const progressUtil = {
  start: () => nProgress.start(),
  stop: () => nProgress.done(),
}
