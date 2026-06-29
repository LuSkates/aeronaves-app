import { AeronaveResponse } from "../dto/aeronaves";

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

function mapAeronaveType(response: any): AeronaveType[] {
  const out = response.map(
    (item: { id: string; value: string; label: string }) => ({
      id: item.id,
      value: item.value.trim(),
      label: item.label.trim(),
    }),
  );
  return out;
}

export function getAeronaveTypes(): AeronaveType[] {
  const rawTypes = getAeronaveTypes();

  return mapAeronaveType(rawTypes);
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
  const aeronave = getAeronaveDetails(code);
  return mapAeronave(aeronave);
}
