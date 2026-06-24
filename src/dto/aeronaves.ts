export type AeronaveResponse = {
  matricula: string;
  fabricante: string;
  tipo_veiculo: string;
  passageiros_maximos: number;
  houve_ocorrencia: boolean;
  proprietario: string;
};

export type AeronaveSearchResponse = string[];

export type AeronaveTypeResponse = {
  id: string;
  valor: string;
  descricao: string;
};
