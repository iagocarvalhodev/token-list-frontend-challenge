/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@appTypes/(.*)$': '<rootDir>/src/types/$1',
    '^@assets/(.*)$': '<rootDir>/public/assets/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true
          },
          keepClassNames: true,
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            react: {
              runtime: 'automatic'
            }
          }
        },
        module: {
          type: 'es6',
          noInterop: false
        }
      }
    ]
  }
}
