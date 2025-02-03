import "@testing-library/jest-dom";

// Mock window.matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return true;
      },
    };
  };

// Mock TextEncoder/TextDecoder
class MockTextEncoder {
  encode(input: string): Uint8Array {
    return new Uint8Array(Buffer.from(input));
  }
}

class MockTextDecoder {
  decode(input?: Uint8Array): string {
    return input ? Buffer.from(input).toString() : "";
  }
}

global.TextEncoder = MockTextEncoder as any;
global.TextDecoder = MockTextDecoder as any;

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
