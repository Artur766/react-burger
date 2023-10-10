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
  productId: string
}

export type TIcon = "primary" | "secondary";

export interface IUser {
  name: string,
  email: string,
  password: string
}
