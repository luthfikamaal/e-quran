export interface Imsakiyah {
  coordinate: Coordinate;
  id: string;
  name: string;
  slug: string;
  provinceId: string;
  province: Province;
  prayers: Prayer[];
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Province {
  id: string;
  name: string;
  slug: string;
}

export interface Prayer {
  time: Time;
  id: string;
  date: string;
  cityId: string;
}

export interface Time {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}
