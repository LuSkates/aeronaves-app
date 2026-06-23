export interface AeronaveSearchItem {
  matricula: string;
}

export interface Aeronave {
  matricula: string;
  manufacturer: string;
  type: string;
  maxPassengers: number;
  rangeKm: number;
}

export type AeronaveType = {
  id: string;
  value: string;
  label: string;
};
