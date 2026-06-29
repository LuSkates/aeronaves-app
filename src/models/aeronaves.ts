export interface AeronaveSearchItem {
  matricula: string;
  fabricante: string;
}

export interface Aeronave {
  matricula: string;
  fabricante: string;
  tipo_veiculo: string;
  passageiros_maximos: number;
  houve_ocorrencia: boolean;
  proprietario: string;
}

export type AeronaveType = {
  id: string;
  value: string;
  label: string;
};
