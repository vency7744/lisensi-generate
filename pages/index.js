import { useState } from "react";

export default function Home() {
    const [userId, setUserId] = useState("");
    const [licenseKey, setLicenseKey] = useState("");
    const [message, setMessage] = useState("");

    const handleGenerate = async () => {
        setMessage("");
        setLicenseKey("");

        if (!userId) {
            setMessage("User ID is required.");
            return;
        }

        try {
            const response = await fetch(
                `/api/generate-license?userId=${encodeURIComponent(userId)}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
            );

            const data = await response.json();

            if (data.success) {
                setLicenseKey(data.licenseKey);
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1>Generate License</h1>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <button onClick={handleGenerate}>Generate</button>

            {licenseKey && (
                <div>
                    <h3>Your License:</h3>
                    <p>{licenseKey}</p>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}