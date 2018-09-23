const keys = {}
const events = {}

export function addEvent() {
  window.addEventListener(
    'keydown',
    e => {
      keys[e.keyCode] = true
    },
    false
  )

  window.addEventListener(
    'keyup',
    e => {
      keys[e.keyCode] = false
    },
    false
  )
}

export function registerKeyEvents(key, callback) {
  events[key] = callback
}

export function callKeyEventHandler() {
  const eventsKeys = Object.keys(events)

  for (let i = 0; i < eventsKeys.length; i++) {
    const key = eventsKeys[i]
    if (keys[key]) {
      events[key]()
    }
  }
}
