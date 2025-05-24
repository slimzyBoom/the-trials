import { Types } from "mongoose";

interface ICard {
  userId: Types.ObjectId;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  cardType: "visa" | "mastercard" ;
  status: "active" | "expired" | "blocked";
}

export type { ICard };
