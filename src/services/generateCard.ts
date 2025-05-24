import dayjs from "dayjs";
import generateAccountNumber from "../utils/generateAccountNumber.util";
import luhnCheck from "../utils/luhnCheck";

const generateCard = () => {
    type CardType = "visa" | "mastercard";

    const BINS: Record<CardType, string> = {
        visa: "400000",
        mastercard: "510000",
    }

    const cards: CardType[] = [ "visa", "mastercard" ];
    const cardType: CardType = cards[Math.floor(Math.random() * cards.length)];
    const bin: string = BINS[cardType];
    const cardNumber = bin + generateAccountNumber(9);
    const checkDigit = luhnCheck(cardNumber);
    const cardNumberWithCheckDigit = cardNumber + checkDigit;

    const cvv = generateAccountNumber(3);

    const providerYear = "visa" === cardType ? 3 : 5;
    const expirationDate = dayjs().add(providerYear, "year").format("MM/YY");

    return {
        cardNumber: cardNumberWithCheckDigit,
        expirationDate,
        cvv,
        cardType,
    }
}

export default generateCard;