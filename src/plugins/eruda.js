import eruda from 'eruda'

/**
 * Initializes the touchscreen based web developer tools for debugging.
 * This should not be called in a production build.
 */
export default function createErudaPlugin() {
  eruda.init({ defaults: { theme: 'Dark' } })
  eruda.scale(1.5)
}
