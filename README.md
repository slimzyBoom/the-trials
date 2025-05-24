# 💳 CardVault - Trial of the Protocol

This project was built as part of the **Trial of the Protocol**, a backend systems challenge by the Learnable Guild 🛡️. The system handles virtual card generation, encryption of sensitive fields, and user-card linking — simulating how real financial systems work under the hood.

## 🔍 What It Does

- Generates **valid virtual cards** (Visa/MasterCard) using the **Luhn algorithm**.
- Encrypts sensitive fields: card number, CVV, phone number, and date of birth.
- Links cards to users in a secure MongoDB schema.
- Exposes an endpoint to list all users with decrypted/encrypted data views.
- Tracks card status (`active`, `expired`, `blocked`) with expiration logic.

## 🔐 Tech Stack

- **Node.js + Express**
- **MongoDB + Mongoose**
- **TypeScript**
- **Nano ID** – for unique card digits
- **Day.js** – to generate expiry dates
- **Custom Luhn algorithm**
- **Crypto** (or your encryption method of choice)

## 📬 API Collection

👉 [Click here to view the Postman Collection](#)  
_Replace `#` with the actual link to your Postman collection._

## 🚀 Setup

1. Clone the repo:
   ```bash
   git clone git@github.com:slimzyBoom/the-trials.git
   cd cardvault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file and add:
   ```
   MONGO_URI=your_mongo_connection_string
   CRYPTO_KEY=your_secret_key
   ```

4. Run the app:
   ```bash
   npm run dev
   ```
