import React, { useState } from "react";
import "./chatbot.css";

export default function Chatbot() {
    const [open, setOpen] = useState(false);

    const suggestedQuestions = [
        "Where has she worked?",
        "What are her AI/ ML skills?",
        "What projects has she built?",
        "What is her GenAI experience?",
        "Tell me about her research at Trustworthy Engineered Autonomy Lab",
        "Where can I find the paper she co-authored?",
    ];

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! Ask me anything about Sindhura.\n" +
                "Note: I can only answer questions about Sindhura's professional background based on the information in her portfolio. I cannot provide personal information or details outside of her portfolio."
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);

    // Send question to API
    const sendQuestion = async (question) => {
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion || loading) return;

        setShowSuggestions(false);

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: trimmedQuestion,
            },
        ]);

        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question: trimmedQuestion,
                }),
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();

            if (!data.answer) {
                throw new Error("No answer returned from API");
            }

            // Add assistant response
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer,
                },
            ]);

            setShowSuggestions(true);

        } catch (error) {
            console.error("Chatbot error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry, I couldn't process that request right now.",
                },
            ]);

            setShowSuggestions(true);

        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendQuestion(input);
    };

    const handleSuggestedQuestion = async (question) => {
        setInput(question);
        await sendQuestion(question);
    };

    return (
        <>
            {open && (
                <div className="chatbotWindow">

                    <div className="chatbotHeader">
                        <span>ASK ORACLE</span>
                    </div>

                    <div className="chatbotMessages">
                        {messages.map((m, i) => (
                            <div key={i} className="chatbotMessage">
                                <span className="chatbotPrompt">
                                    {m.role === "user" ? "you>" : ">"}
                                </span>

                                {m.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="chatbotMessage">
                                <span className="chatbotPrompt">&gt;</span>
                                ...
                            </div>
                        )}
                    </div>

                    {showSuggestions && !loading && (
                        <div className="suggestedQuestions">
                            <p className="suggested">
                                Suggested Questions
                            </p>

                            {suggestedQuestions.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    className="suggestedQuestion"
                                    onClick={() =>
                                        handleSuggestedQuestion(question)
                                    }
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        className="chatbotInput"
                        onSubmit={handleSubmit}
                    >
                        <span>&gt;</span>

                        <input
                            type="text"
                            value={input}
                            placeholder="Ask about my portfolio..."
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            disabled={loading}
                        />
                    </form>
                </div>
            )}

            <button
                className="chatbotToggleBtn"
                onClick={() => setOpen((o) => !o)}
                aria-label={
                    open
                        ? "Close chatbot"
                        : "Open chatbot"
                }
            >
                {open ? "×" : ">_"}
            </button>
        </>
    );
}