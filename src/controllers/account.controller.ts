import { RequestHandler } from "express";
import type { IUser } from "../types/user.js";
import type { ICard } from "../types/card.js";
import { User } from "../models/user.model.js";
import Card from "../models/cards.model.js";
import generateAccountNumber from "../utils/generateAccountNumber.util.js";
import generateCard from "../services/generateCard.js";
import { encrypt, decrypt } from "../utils/crypto.util.js";

/*
 * @desc Create a new user account and generate a card
 * @route POST /api/v1/account
 */
const createAccount: RequestHandler = async (req, res) => {
  const { firstName, surname, email, phoneNumber, dateOfBirth }: IUser =
    req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    }).exec();
    if (existingUser) {
      res.status(409).json({ message: "User already exists", success: false });
      return;
    }
    const accountNumber = generateAccountNumber(10);

    const newUser = await User.create({
      firstName,
      surname,
      email,
      phoneNumber: encrypt(phoneNumber),
      dateOfBirth: encrypt(dateOfBirth),
      accountNumber,
    });

    const { cardNumber, expirationDate, cvv, cardType } = generateCard();

    // Save new card to the database
    const newCard = await Card.create({
      userId: newUser._id,
      cardNumber: encrypt(cardNumber),
      cardHolderName: `${firstName} ${surname}`,
      expirationDate: encrypt(expirationDate),
      cvv: encrypt(cvv),
      cardType,
    });

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        encrypted: {
          firstName: newUser.firstName,
          surname: newUser.surname,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          dateOfBirth: newUser.dateOfBirth,
          accountNumber: newUser.accountNumber,
        },
        decrypted: {
          firstName,
          surname,
          email,
          phoneNumber,
          dateOfBirth,
          accountNumber,
        },
      },
      cardDetails: {
        encrypted: {
          cardNumber: newCard.cardNumber,
          expirationDate: newCard.expirationDate,
          cvv: newCard.cvv,
          cardType: newCard.cardType,
        },
        decrypted: {
          cardNumber,
          expirationDate,
          cvv,
          cardType,
        },
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getAllAccount: RequestHandler = async (_req, res) => {
  interface extendedIUser extends IUser {
    cards: ICard[];
  }
  try {
    const accounts = await User.aggregate([
      {
        $lookup: {
          from: "cards",
          foreignField: "userId",
          localField: "_id",
          as: "cards",
        },
      },
    ]);

    const userDetails = accounts.map((user: extendedIUser) => ({
      accountNumber: user.accountNumber,
      fullname: `${user.surname} ${user.firstName}`,
      encryptedPhoneNumber: user.phoneNumber,
      decryptedPhoneNumber: decrypt(user.phoneNumber),
      encryptedDateOfBirth: user.dateOfBirth,
      decryptedDateOfBirth: decrypt(user.dateOfBirth),
      cards: user.cards.map((card: ICard) => ({
        encryptedCardNumber: card.cardNumber,
        decryptedCardNumber: decrypt(card.cardNumber),
        encryptedExpirationDate: card.expirationDate,
        decryptedExpirationDate: decrypt(card.expirationDate),
        encryptedCvv: card.cvv,
        decryptedCvv: decrypt(card.cvv),
        cardType: card.cardType,
        status: card.status
      })),
    }));

    res.json({ success: true, data: userDetails });
  } catch (error) {
    console.error("Error getting all accounts: ", error);
    res
      .status(500)
      .json({ error: "Error getting all accounts", success: false });
  }
};

const decryptData: RequestHandler = async (req, res) => {
  const { data } : Record<string, string> = req.body
  try {
    const decryptedData = decrypt(data);
    res.json({ data: decryptedData, message: "Data decrypted successfully", success: true})
  } catch (error) {
    console.log("Error decrypting data :", error)
    res.status(500).json({ error : "Error decrypting data", success : false})
  }
}

export { createAccount, getAllAccount, decryptData };
