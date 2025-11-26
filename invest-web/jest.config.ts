import type { Config } from 'jest';
import { createCjsPreset } from 'jest-preset-angular/presets/index.js';

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^@cdt/domain/(.*)$': '<rootDir>/projects/cdt/src/app/domain/$1',
    '^@cdt/ui/(.*)$': '<rootDir>/projects/cdt/src/app/ui/$1',
    '^@cdt/infrastructure/(.*)$': '<rootDir>/projects/cdt/src/app/infrastructure/$1',
    '^@cdt/application/(.*)$': '<rootDir>/projects/cdt/src/app/application/$1',
    '^@cdt/config/(.*)$': '<rootDir>/projects/cdt/src/app/config/$1',
    '^@cdt/environments/(.*)$': '<rootDir>/projects/cdt/src/environments/$1',
  },
  transformIgnorePatterns: [String.raw`node_modules/(?!.*\.mjs$|@dark-light-20/invest-domain)`],
} satisfies Config;
