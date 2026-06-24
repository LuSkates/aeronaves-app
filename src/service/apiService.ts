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
import { searchMatriculas } from "@/api/api";

function mapAeronave(response: AeronaveResponse): Aeronave {
  return {
    matricula: response.matricula,
    fabricante: response.fabricante,
    tipo_veiculo: response.tipo_veiculo,
    passageiros_maximos: response.passageiros_maximos,
    houve_ocorrencia: response.houve_ocorrencia,
    proprietario: response.proprietario,
  };
}

function mapMatriculas(response: AeronaveSearchResponse): AeronaveSearchItem[] {
  const out = response.map((item) => ({
    matricula: item,
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

export async function searchAeronavesMatriculas(
  query: string,
  type?: string,
): Promise<AeronaveSearchItem[]> {
  const data = await searchMatriculas(query, type);
  const searchResults = mapMatriculas(data);
  return searchResults;
}

export function getAeronaveDetails(code: string): Aeronave {
  const aeronave = mapAeronave(mockAeronaveResponse);
  return aeronave;
}
