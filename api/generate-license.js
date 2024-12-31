import { v4 as uuidv4 } from "uuid";

let licenses = []; // Temporary storage for licenses

export default function handler(req, res) {
    const { userId, apiKey } = req.query;

    const validApiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey !== validApiKey) {
        return res.status(401).json({ success: false, message: "Invalid API Key." });
    }

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const licenseKey = uuidv4().toUpperCase();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    licenses.push({ userId, licenseKey, valid: true, expiryDate: expiryDate.toISOString() });

    res.status(200).json({ success: true, licenseKey, message: "License generated successfully." });
}