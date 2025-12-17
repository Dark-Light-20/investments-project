# @dark-light-20/invest-domain

This package contains the core domain logic for the investments project, designed to be framework-agnostic and reusable across backend services and frontend applications. It enforces Clean Architecture principles by isolating business rules from infrastructure details.

## 🚀 Features

- **Domain Entities & Value Objects:** Type-safe definitions for financial products like CDTs, FICs, and Savings Pockets.
- **Use Cases:** Pure business logic implementations for simulations and rate calculations.
- **Abstract Gateways:** Interfaces defining contracts for data retrieval, enabling Dependency Inversion.
- **Hybrid Build:** Bundled with **tsup** to support both **ESM** and **CommonJS**, ensuring compatibility with modern Angular apps and Node.js backends.
- **Tested:** Comprehensive unit test suite using **Jest**.

## 📦 Installation

```bash
npm install @dark-light-20/invest-domain
```

## 🏗 Architecture

### Domain Layer (Value Objects)

Defines the core data structures and types:

- `CdtRate`, `CdtSimulation`
- `FicRate`
- `PocketSimulation`

### Application Layer (Use Cases)

Contains the business logic services:

- **CDT:** `CdtUseCase` (Simulate returns based on amount and term).
- **FIC:** `FicUseCase` (Retrieve historical rates).
- **Pocket:** `PocketUseCase` (Simulate savings growth with monthly contributions).

### Ports (Gateways)

Abstract interfaces that must be implemented by the infrastructure layer (Dependency Inversion):

- `CdtGateway`
- `FicGateway`
- `PocketGateway`

## 🛠 Usage

### Implementing a Gateway

```typescript
import { CdtGateway, CdtRate } from "@dark-light-20/invest-domain";

export class MyCdtRepository implements CdtGateway {
  async getAllCDTRates(): Promise<CdtRate[]> {
    // Fetch data from API or Database
    return [];
  }
}
```

### Using a Use Case

```typescript
import { CdtUseCase, CDTTermUnit } from "@dark-light-20/invest-domain";

const useCase = new CdtUseCase(new MyCdtRepository());
const simulation = await useCase.simulateCDT(1000000, 360, CDTTermUnit.DAYS);
```

## 🧪 Testing

This library uses **Jest** for unit testing to ensure the reliability of business rules.

```bash
npm run test
```

## ⚡ Build

The project uses **tsup** for efficient bundling, ensuring zero-config TypeScript compilation:

```bash
npm run build
```

This generates optimized output for both `esm` (ECMAScript Modules) and `cjs` (CommonJS) formats in the `dist` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
