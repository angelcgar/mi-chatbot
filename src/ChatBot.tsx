import { useState } from "react";

export default function ChatBot() {
	const [messages, setMessages] = useState<unknown>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const handleSend = async () => {
		if (!input.trim()) return;
		const newMessages = [...messages, { role: "user", content: input }];
		setMessages(newMessages);
		setInput("");
		setLoading(true);
		const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY_OPENROUTER}`,
				"Content-Type": "application/json",
				"HTTP-Referer": "http://localhost",
				"X-Title": "mi-chatbot",
			},
			body: JSON.stringify({
				model: "mistralai/mistral-7b-instruct",
				messages: [
					{ role: "system", content: "Eres un asistente útil." },
					...newMessages,
				],
			}),
		});
		const data = await res.json();
		const botReply = data.choices?.[0]?.message?.content ?? "[Sin respuesta]";
		setMessages([...newMessages, { role: "assistant", content: botReply }]);
		setLoading(false);
	};
	return (
		<div style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
			<h1>💬 ChatBot</h1>
			<div style={{ border: "1px solid #ccc", padding: 16, minHeight: 300 }}>
				{messages.map((msg, i) => (
					<p key={i}>
						<strong>{msg.role === "user" ? "👤 Tú" : "🤖 Bot"}:</strong>
						{msg.content}
					</p>
				))}
				{loading && <p>⏳ Pensando...</p>}
			</div>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleSend()}
				placeholder="Escribe tu mensaje..."
				style={{ width: "100%", marginTop: 8, padding: 8 }}
			/>
			<button onClick={handleSend} style={{ marginTop: 8 }}>
				Enviar
			</button>
		</div>
	);
}
