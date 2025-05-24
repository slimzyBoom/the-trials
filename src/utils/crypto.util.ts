import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.CRYPTO_KEY as string, "hex");

const encrypt = (text: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
}

const decrypt = (data : string) => {
    const [vi, encrypted] = data.split(":");
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(vi, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
}

export { encrypt, decrypt };