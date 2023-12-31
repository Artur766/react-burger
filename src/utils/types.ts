export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  productId: string,
  count: number,
  __v: number,
  id?: string
}

export type TIcon = "primary" | "secondary";

export interface IUser {
  name?: string,
  email: string,
  password?: string
}

export type TCurrentTab = "buns" | "sauce" | 'main';


export type TDropCollectedProps = {
  isOver: boolean
}

export interface ITokenResponse {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: IUser
}

export interface IAuthResult {
  payload: unknown;
}

export interface IMessage {
  success: boolean
  orders: [
    {
      ingredients: string[]
      _id: string
      name: string
      status: string
      number: number
      createdAt: Date
      updatedAt: Date
      price: number
      __v: number
    }
  ],
  total: number
  totalToday: number
}