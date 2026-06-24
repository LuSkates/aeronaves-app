import { Aeronave, AeronaveType } from "@/models/aeronaves";

const BASE_URL = "https://localhost:3333/api";

export async function getAeronaveTypes(): Promise<AeronaveType[]> {
  const response = await fetch(`${BASE_URL}/aeronave-types`);

  if (!response.ok) {
    throw new Error("Failed to load Aeronave types");
  }

  return response.json();
}

export async function searchMatriculas(
  query: string,
  type?: string,
): Promise<string[]> {
  const params = new URLSearchParams();

  if (type) {
    params.append("tipo_de_veiculo", type);
  }

  params.append("search", query);
  console.log(`${BASE_URL}/matriculas?${params.toString()}`);
  const response = await fetch(`${BASE_URL}/matriculas?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to search Matriculas");
  }

  return response.json();
}

export async function getAeronaveDetails(code: string): Promise<Aeronave> {
  const response = await fetch(`${BASE_URL}/aeronaves/${code}`);

  if (!response.ok) {
    throw new Error("Failed to load Aeronave details");
  }

  return response.json();
}
