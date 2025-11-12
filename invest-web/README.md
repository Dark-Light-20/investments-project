# Invest-App Mockup

This app consists in a simple web page that allows the user to search the investment financial products of banks and compare them. The main products that the user can search are CDTs (Certificado de Depósito a Término) and FICs (Fondos de Inversión Colectiva).

- For CDTs, the user can view the different rates offered by the banks with its term data.
- For FICs, the user can view the different rates offered by the banks with its data.

## Mockup

![Mockup](docs/invest-app-mockup.png)

## Architecture

The architecture of the app is based on microfrontend architecture using Angular 15 as its frontend framework (implementing standalone components) and implementing Clean Architecture for separation of the app layers. The layers are:

- **Domain**: This layer contains the business logic of the app. It is the most inner layer of the app and it is independent of the other layers. Where the entities, use cases and repositories are defined.
- **Infrastructure**: This layer contains the implementation of the repositories defined in the domain layer. It is one of the outer layers of the app and it is dependent of the domain layers. Where the data sources are defined.
- **UI**: This layer contains the implementation of the UI of the app. It is one of the outer layers of the app and it is dependent of the domain and infrastructure (indirectly) layers. Where the web page and its components are defined.

## Domain

The domain entities and use cases are explained in the [Domain](docs/Domain.md) file.

## Infrastructure

The app consume the data from the diferent [Invest-App APIs](https://github.com/Dark-Light-20/investData). For now there are only 5 APIs:

- invest-bancolombia
- invest-bdb
- invest-ban100
- invest-nu
- invest-finandina

The consumption is made by the web-app infrastructure layer using Azure functions as the data source endpoints.

## UI

The UI of the app is made with Angular 15 using standalone components and module federation (for microfrontends architecture implementation). The UI is divided in 3 main apps:

- Shell app: This app is the main app of the web page. It contains the header and footer of the web page, a home component with a short summary of the app and the routing of the other apps.
- CDT app: This app contains the CDT Rates search component and the CDT Calculate Investment component.
- FIC app: This app contains the FIC Rates search component.

## How to run the app

### Prerequisites

- Node.js
- Angular CLI

### Steps

1. Clone the repository
2. Run `npm install` in the root folder
3. Run `npm run start <project>` in the root folder. You need to specify which project to start: shell, cdt, or fic.
4. Open the browser in `http://localhost:4200/`

## Tests

The tests are made with Jest. Each layer has its own tests. To run the tests, run `npm run test` in the root folder. This will run the tests in coverage mode, so a coverage folder is created in the root folder where it has an index.html file to view in a web browser the coverage of the project code.
