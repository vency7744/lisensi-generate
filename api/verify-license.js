export default function handler(req, res) {
    const { key, apiKey } = req.query;

    const validApiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey !== validApiKey) {
        return res.status(401).json({ valid: false, message: "Invalid API Key." });
    }

    const license = licenses.find((lic) => lic.licenseKey === key);
    if (!license || !license.valid) {
        return res.status(403).json({ valid: false, message: "Invalid license." });
    }

    const now = new Date();
    if (new Date(license.expiryDate) < now) {
        return res.status(403).json({ valid: false, message: "License expired." });
    }

    res.status(200).json({ valid: true, message: "License is valid." });
}