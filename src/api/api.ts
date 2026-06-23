import { Aeronave, AeronaveSearchItem, AeronaveType } from "@/models/aeronaves";

const BASE_URL = "https://your-api.com";

export async function getAeronaveTypes(): Promise<AeronaveType[]> {
  const response = await fetch(`${BASE_URL}/Aeronave-types`);

  if (!response.ok) {
    throw new Error("Failed to load Aeronave types");
  }

  return response.json();
}

export async function searchAeronaves(
  query: string,
  type?: string,
): Promise<AeronaveSearchItem[]> {
  const params = new URLSearchParams();

  params.append("query", query);

  if (type) {
    params.append("type", type);
  }

  const response = await fetch(`${BASE_URL}/Aeronaves?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to search Aeronaves");
  }

  return response.json();
}

export async function getAeronaveDetails(code: string): Promise<Aeronave> {
  const response = await fetch(`${BASE_URL}/Aeronaves/${code}`);

  if (!response.ok) {
    throw new Error("Failed to load Aeronave details");
  }

  return response.json();
}
