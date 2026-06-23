// models/__mocks__/aeronaveMocks.ts

import {
  Aeronave,
  AeronaveSearchItem,
  AeronaveType,
} from "../models/aeronaves";

export const mockAeronave: Aeronave = {
  matricula: "A320",
  manufacturer: "Airbus",
  type: "COM",
  maxPassengers: 180,
  rangeKm: 6150,
};

export const mockAeronaveSearchItems: AeronaveSearchItem[] = [
  {
    matricula: "A320",
  },
  {
    matricula: "A321",
  },
  {
    matricula: "B738",
  },
];

export const mockAeronaveTypes: AeronaveType[] = [
  {
    id: "all",
    value: "",
    label: "All",
  },
  {
    id: "1",
    value: "COM",
    label: "Commercial",
  },
  {
    id: "2",
    value: "MIL",
    label: "Military",
  },
  {
    id: "3",
    value: "CGO",
    label: "Cargo",
  },
];
