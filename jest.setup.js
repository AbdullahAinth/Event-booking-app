// jest.setup.js
// This provides TextEncoder and TextDecoder in the JSDOM environment
// if they are not available by default.
// It is common for older Node.js versions or specific library interactions.
if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder } = require('util'); // For Node.js built-in module
    global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
    const { TextDecoder } = require('util'); // For Node.js built-in module
    global.TextDecoder = require('util').TextDecoder; // Need to import it this way as well
}

// You might also need these, especially for fetch APIs
// import 'whatwg-fetch'; // Install this package if you need to mock fetch
// global.fetch = jest.fn(() =>
//   Promise.resolve({ json: () => Promise.resolve({}) })
// );
// global.Response = jest.fn();
// global.Request = jest.fn();
// global.Headers = jest.fn();

// Additional setup for @testing-library/jest-dom
import '@testing-library/jest-dom';