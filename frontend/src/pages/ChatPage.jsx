import { useState } from "react";
import api from "../services/api";

function ChatPage() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await api.post("/chat", {
                message: message,
            });

            const botMessage = {
                sender: "bot",
                text: response.data.response,
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            const botMessage = {
                sender: "bot",
                text: "Unable to connect to GramHealthAI.",
            };

            setMessages((prev) => [...prev, botMessage]);
        }

        setMessage("");
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">

            <header className="bg-blue-600 text-white px-6 py-4 shadow-md">
                <h1 className="text-2xl font-bold">🩺 GramHealthAI</h1>
                <p className="text-sm opacity-90">
                    Rural Health Awareness Assistant
                </p>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow ${msg.sender === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-black"
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

            </div>

            <div className="p-4 flex gap-3 border-t">

                <input
                    className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ask a health question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />

                <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default ChatPage;