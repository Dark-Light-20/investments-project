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
    '^@fic/domain/(.*)$': '<rootDir>/projects/fic/src/app/domain/$1',
    '^@fic/ui/(.*)$': '<rootDir>/projects/fic/src/app/ui/$1',
    '^@fic/infrastructure/(.*)$': '<rootDir>/projects/fic/src/app/infrastructure/$1',
    '^@fic/application/(.*)$': '<rootDir>/projects/fic/src/app/application/$1',
    '^@fic/config/(.*)$': '<rootDir>/projects/fic/src/app/config/$1',
    '^@fic/environments/(.*)$': '<rootDir>/projects/fic/src/environments/$1',
    '^invest-web-lib$': '<rootDir>/projects/invest-web-lib/src/public-api.ts',
  },
  transformIgnorePatterns: [String.raw`node_modules/(?!.*\.mjs$|@dark-light-20/invest-domain)`],
} satisfies Config;
