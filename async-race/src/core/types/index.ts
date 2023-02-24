export interface TGarage {
  name: string;
  color: string;
  id: number;
}

export type TWinners = [
  {
    id: number;
    wins: number;
    time: number;
  }
];

export interface obj {
  name: string;
  color: string;
}

export interface options {
  distance: number;
  velocity: number;
}

export interface props {
  name: string;
  color: string;
}

export interface Response {
  [key: number]: obj;
}
export interface obj2 {
  name: string;
  color: string;
  id: number;
}

export interface Response2 {
  [key: number]: obj2;
}
