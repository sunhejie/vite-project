import { createNanoEvents, Unsubscribe } from 'nanoevents'
import { onMounted, onUnmounted } from 'vue'

interface EventsMap {
  'delete-major': (id: number) => void
  'delete-question': VoidFunction
  'refetch-question-options': VoidFunction
  'hide-notification-popover': VoidFunction
  'question-reverted': VoidFunction
  'add-new-question': VoidFunction
  'open-question-comments': VoidFunction
  'save-question': VoidFunction
  'open-organization-applications': VoidFunction
}
type Events = keyof EventsMap

class Emitter {
  private _emitter = createNanoEvents<EventsMap>()
  on<E extends Events>(event: E, cb: EventsMap[E]) {
    return this._emitter.on(event, cb)
  }
  emit<E extends Events>(event: E, ...params: Parameters<EventsMap[E]>) {
    return this._emitter.emit(event, ...params)
  }
  /**
   * 在 onUnmount 时自动卸载监听，可链式调用
   * @returns Emitter
   */
  autoUnbind<E extends Events>(
    event: E,
    cb: EventsMap[E],
    { immediate = true } = {}
  ) {
    let unbind: Unsubscribe

    if (immediate) unbind = this.on(event, cb)
    else onMounted(() => (unbind = this.on(event, cb)))

    onUnmounted(() => unbind?.())

    return this
  }
  clear() {
    this._emitter.events = {}
  }
  get events() {
    return this._emitter.events
  }
}

export const emitter = new Emitter()
