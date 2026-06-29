import { Aeronave } from "@/models/aeronaves";

const BASE_URL = "http://localhost:8001";

export async function getAeronaveTypes(): Promise<any> {
  const response = await fetch(`${BASE_URL}/aeronave-types`);

  if (!response.ok) {
    throw new Error("Failed to load Aeronave types");
  }

  const data = await response.json();

  return data.results;
}

export async function searchMatriculas(
  query: string,
  type?: string,
): Promise<any> {
  const params = new URLSearchParams();

  if (type) {
    params.append("tipo_de_veiculo", type);
  }

  params.append("search", query);
  try {
    const response = await fetch(`${BASE_URL}/matriculas?${params.toString()}`);

    const data = await response.json();

    return data.results;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getAeronaveDetails(code: string): Promise<Aeronave> {
  const response = await fetch(`${BASE_URL}/aeronaves/${code}`);

  if (!response.ok) {
    throw new Error("Failed to load Aeronave details");
  }

  const data = await response.json();

  return data.results;
}
