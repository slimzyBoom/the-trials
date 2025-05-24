import mongoose, { Schema, Document } from "mongoose";
import type { IUser } from "../types/user.js";
import Joi from "joi"

interface IUserDocument extends Document, IUser {}

const userSchema = new Schema<IUserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
  },
});

const User = mongoose.model<IUserDocument>("User", userSchema);


const userSchemaValidation = Joi.object<IUser>({
    firstName: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber : Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    accountNumber: Joi.string()
})

export { User, userSchemaValidation };