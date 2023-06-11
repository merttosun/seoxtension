global.chrome = {
  tabs: {
    query: function () {},
    sendMessage: function () {},
  },
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const mockPerformanceObserver = jest.fn()
mockPerformanceObserver.mockReturnValue({
  observe: () => null,
  takeRecords: () => [],
  disconnect: () => null,
})
global.PerformanceObserver = mockPerformanceObserver
