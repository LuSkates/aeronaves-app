import {
  mockAeronaveResponse,
  mockAeronaveSearchResponses,
  mockAeronaveTypeResponses,
} from "@/mocks/apiResponse";

import {
  AeronaveResponse,
  AeronaveSearchResponse,
  AeronaveTypeResponse,
} from "../dto/aeronaves";

import {
  Aeronave,
  AeronaveSearchItem,
  AeronaveType,
} from "../models/aeronaves";

function mapAeronave(response: AeronaveResponse): Aeronave {
  return {
    matricula: response.codigo,
    manufacturer: response.fabricante,
    type: response.tipo,
    maxPassengers: response.capacidade_passageiros,
    rangeKm: response.alcance_km,
  };
}

function mapAeronaveSearch(
  response: AeronaveSearchResponse,
): AeronaveSearchItem[] {
  const out = response.map((item) => ({
    matricula: item.codigo,
  }));
  return out;
}

function mapAeronaveType(response: AeronaveTypeResponse): AeronaveType {
  return {
    id: response.id,
    value: response.valor.trim(),
    label: response.descricao.trim(),
  };
}

export function getAeronaveTypes(): AeronaveType[] {
  const types = mockAeronaveTypeResponses.map(mapAeronaveType);
  return types;
}

export function searchAeronaves(
  query: string,
  type?: string,
): AeronaveSearchItem[] {
  const searchResults = mapAeronaveSearch(mockAeronaveSearchResponses);
  return searchResults;
}

export function getAeronaveDetails(code: string): Aeronave {
  const aeronave = mapAeronave(mockAeronaveResponse);
  return aeronave;
}
