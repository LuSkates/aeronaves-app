// services/__mocks__/apiResponses.ts

import {
  AeronaveResponse,
  AeronaveSearchResponse,
  AeronaveTypeResponse,
} from "../dto/aeronaves";

export const mockAeronaveResponse: AeronaveResponse = {
  codigo: "A320",
  descricao: "Airbus A320",
  fabricante: "Airbus",
  tipo: "COM",
  capacidade_passageiros: 180,
  alcance_km: 6150,
};

export const mockAeronaveSearchResponses: AeronaveSearchResponse = [
  {
    codigo: "A320",
  },
  {
    codigo: "A321",
  },
  {
    codigo: "B738",
  },
];

export const mockAeronaveTypeResponses: AeronaveTypeResponse[] = [
  {
    id: "1",
    valor: "COM",
    descricao: "Commercial",
  },
  {
    id: "2",
    valor: "MIL",
    descricao: "Military",
  },
  {
    id: "3",
    valor: "CGO",
    descricao: "Cargo",
  },
];
