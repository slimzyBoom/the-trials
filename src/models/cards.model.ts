import mongoose, { Schema, Document } from "mongoose";
import type { ICard } from "../types/card.js";

interface ICardDocument extends Document, ICard {}

const cardSchema = new Schema<ICardDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      enum: ["visa", "mastercard"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model<ICardDocument>("Card", cardSchema);

export default Card;