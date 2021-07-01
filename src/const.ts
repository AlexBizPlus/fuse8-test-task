export const Routes = {
  HOME: '/',
  ERROR404: '/404',
  DETAILS: '/details',
};

export const CARD_COUNT = 6;

export interface IHome {
  id: string;
  title: string;
  address: string;
  type?: TypeOfType;
  price?: number;
}

export type TypeOfType = 'IndependentLiving' | 'SupportAvailable';

export const CardSize = {
  width: 380,
  height: 380,
};

export const ImgSize = {
  width: 377,
  height: 227,
};

export const MIN_SEARCH = 3;
