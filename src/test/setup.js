import '@testing-library/jest-dom/vitest'

globalThis.IntersectionObserver = class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
  }

  observe(target) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this)
  }

  unobserve() {}

  disconnect() {}
}
