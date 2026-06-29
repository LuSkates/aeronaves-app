import {
  mockAeronaveResponse,
  mockAeronaveTypeResponses,
} from "@/mocks/apiResponse";

import { AeronaveResponse, AeronaveTypeResponse } from "../dto/aeronaves";

import { searchMatriculas } from "@/api/api";
import {
  Aeronave,
  AeronaveSearchItem,
  AeronaveType,
} from "../models/aeronaves";

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

function mapMatriculas(response: any): AeronaveSearchItem[] {
  const out = response.map(
    (item: { matricula: string; fabricante: string }) => ({
      matricula: item.matricula,
      fabricante: item.fabricante,
    }),
  );
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
