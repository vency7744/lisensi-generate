import { useState } from "react";

export default function Verify() {
    const [licenseKey, setLicenseKey] = useState("");
    const [message, setMessage] = useState("");

    const handleVerify = async () => {
        setMessage("");

        if (!licenseKey) {
            setMessage("License Key is required.");
            return;
        }

        try {
            const response = await fetch(
                `/api/verify-license?key=${encodeURIComponent(licenseKey)}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
            );

            const data = await response.json();

            if (data.valid) {
                setMessage("License is valid!");
            } else {
                setMessage(data.message);
            }
        } catch {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1>Verify License</h1>
            <input
                type="text"
                placeholder="Enter License Key"
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
            />
            <button onClick={handleVerify}>Verify</button>

            {message && <p>{message}</p>}
        </div>
    );
}