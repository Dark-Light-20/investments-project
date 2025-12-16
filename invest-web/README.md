# Invest-App Web

This app consists in a web application that allows the user to search the investment financial products of banks and compare them. The main products that the user can search are CDTs (Certificado de Depósito a Término), FICs (Fondos de Inversión Colectiva) and Pockets (Bolsillos rentables de cuentas de ahorro).

- For CDTs, the user can view the different rates offered by the banks with its term data and simulate an investment.
- For FICs, the user can view the different rates offered by the banks with its data.
- For Pockets, the user can simulate an investment in a Pocket.

## Mockup

![Mockup](docs/invest-app-mockup.png)

## Architecture

The architecture of the app is based on microfrontend architecture using Angular 15 as its frontend framework (implementing standalone components) and implementing Clean Architecture for separation of the app layers. The layers are:

- **Domain**: This layer contains the business logic of the app. It is the most inner layer of the app and it is independent of the other layers. Where the entities and repositories are defined.
- **Application**: This layer contains the definition of the use cases that use the domain layer. It is one of the outer layers of the app and it is dependent of the domain layer. Where the gateways to the repositories are implemented to interact with the entities.
- **Infrastructure**: This layer contains the implementation of the repositories defined in the domain layer. It is one of the outer layers of the app and it is dependent of the domain layers. Where the data sources are defined.
- **UI**: This layer contains the implementation of the UI of the app. It is one of the outer layers of the app and it is dependent of the domain and infrastructure (indirectly) layers. Where the web page and its components are defined.
- **Config**: This layer contains the configuration of the clean architecture for the app. It is one of the outer layers of the app and it is dependent of the other layers. Where the providers are defined to connect the use cases with the repositories.

## Domain

The domain entities and use cases are explained in the [Domain](docs/Domain.md) file.

## Application

The application layer contains the implementation of the use cases defined in the domain layer. Each use case has its own folder where the implementation is made using Angular services. Each use case class implements an interface defined in the domain layer (the gateway). These can contain some business logic if needed, but in most cases they just call the repository methods to get the data.

## Infrastructure

The app consume the data from the diferent [Invest-App APIs](https://github.com/Dark-Light-20/investData). For now there are only 5 APIs:

- invest-bancolombia
- invest-bdb
- invest-ban100
- invest-nu
- invest-finandina

The consumption is made by the web-app infrastructure layer using Azure functions as the data source endpoints.

## UI

This project has a mockup prototyped with Google Stitch, for more details of the proposed design see the [Stitch Invest-App Web Design](./docs/UI-prototype.md) document.

The UI of the app is made with Angular 20 using standalone components and module federation (for microfrontends architecture implementation). The UI is divided in 4 main apps:

- Shell app (Host): This app is the main app of the web page. It contains the header and footer of the web page and define the layout for the remote microfrontend apps.
- Home app (Remote): This app contains the home component with a short summary of the app features, available banks and the routing of the other apps.
- CDT app (Remote): This app contains the CDT Rates list component and the CDT Calculate Investment component.
- FIC app (Remote): This app contains the FIC Rates list component.
- Pocket app (Remote): This app contains the Pocket Simulator component.

## How to run the app

### Prerequisites

- Node.js
- Angular CLI

### Steps

1. Clone the repository
2. Run `npm install` in the root folder
3. Run `npm run start <project>` in the root folder. You need to specify which project to start: shell, home, cdt, or fic.
4. Open the browser in `http://localhost:<port>/`

## Tests

The tests are made with Jest. Each layer has its own tests. To run the tests, run `npm run test` in the root folder. This will run the tests in coverage mode, so a coverage folder is created in the root folder where it has an index.html file to view in a web browser the coverage of the project code.
