export type AeronaveResponse = {
  codigo: string;
  descricao: string;
  fabricante: string;
  tipo: string;
  capacidade_passageiros: number;
  alcance_km: number;
};

export type AeronaveSearchResponse = AeronaveSearchItem[];

type AeronaveSearchItem = {
  codigo: string;
};

export type AeronaveTypeResponse = {
  id: string;
  valor: string;
  descricao: string;
};
