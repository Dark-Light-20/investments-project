import { randomUUID } from 'node:crypto';

import 'jest-preset-angular/setup-jest';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID,
  },
});
