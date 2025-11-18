import { Banco } from './invest.model';

export const DEFAULT_BANCOS: Banco[] = [
  {
    id: 'banco-a',
    nombre: 'BancoCapital',
    logoUrl: 'https://placehold.co/100x100/0284C7/FFFFFF?text=BC',
    tasas: [
      { id: 'a1', tasaEA: 0.105, montoMin: 500000, montoMax: 4999999, diasMin: 90, diasMax: 179 },
      { id: 'a2', tasaEA: 0.11, montoMin: 500000, montoMax: 4999999, diasMin: 180, diasMax: 365 },
      { id: 'a3', tasaEA: 0.115, montoMin: 5000000, montoMax: 99999999, diasMin: 90, diasMax: 179 },
      { id: 'a4', tasaEA: 0.12, montoMin: 5000000, montoMax: 99999999, diasMin: 180, diasMax: 365 },
    ],
  },
  {
    id: 'banco-b',
    nombre: 'Inversión Segura',
    logoUrl: 'https://placehold.co/100x100/059669/FFFFFF?text=IS',
    tasas: [
      { id: 'b1', tasaEA: 0.1, montoMin: 1000000, montoMax: 100000000, diasMin: 60, diasMax: 119 },
      { id: 'b2', tasaEA: 0.112, montoMin: 1000000, montoMax: 100000000, diasMin: 120, diasMax: 240 },
      { id: 'b3', tasaEA: 0.118, montoMin: 1000000, montoMax: 100000000, diasMin: 241, diasMax: 365 },
    ],
  },
  {
    id: 'banco-c',
    nombre: 'Financiera Futuro',
    logoUrl: 'https://placehold.co/100x100/7C3AED/FFFFFF?text=FF',
    tasas: [{ id: 'c1', tasaEA: 0.122, montoMin: 2000000, montoMax: 50000000, diasMin: 180, diasMax: 365 }],
  },
  {
    id: 'banco-d',
    nombre: 'NeoBanco Digital',
    logoUrl: 'https://placehold.co/100x100/D97706/FFFFFF?text=ND',
    tasas: [{ id: 'd1', tasaEA: 0.11, montoMin: 100000, montoMax: 10000000, diasMin: 30, diasMax: 365 }],
  },
];
