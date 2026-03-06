export interface FICRawModel {
  name: string;
  "Año corrido": string;
  Diaria: string;
  "30 días": string;
  "180 días": string;
  "1° año": string;
  "2° año": string;
  "3° año": string;
}

export interface FICConfig {
  name: string; // Display name for the FIC
  url: string; // URL where the table is located
  rowName: string; // Exact row name in the HTML table (case-insensitive)
}
