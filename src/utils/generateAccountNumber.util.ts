import { customAlphabet } from "nanoid";

const generateAccountNumber = (digit : number) => {
    const accountNumber = customAlphabet("1234567890", digit)
    return accountNumber();
}

export default generateAccountNumber;