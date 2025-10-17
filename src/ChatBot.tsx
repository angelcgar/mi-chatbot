import { useState, useRef } from 'react';

// Tipos
type Role = 'system' | 'user' | 'assistant';

interface Message {
	role: Role;
	content: string;
}

interface ChatResponse {
	choices?: {
		message?: {
			content?: string;
		};
	}[];
}

export default function ChatBot() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);

	const scrollRef = useRef<HTMLDivElement | null>(null);

	const handleSend = async () => {
		if (!input.trim()) return;

		const newMessages = [...messages, { role: 'user', content: input }];

		setMessages(newMessages);
		console.log(newMessages, 'newMessages');
		setInput('');
		setLoading(true);

		const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY_OPENROUTER}`,
				'Content-Type': 'application/json',
				'HTTP-Referer': 'http://localhost',
				'X-Title': 'mi-chatbot',
			},
			body: JSON.stringify({
				model: 'mistralai/mistral-7b-instruct',
				messages: [
					{ role: 'system', content: 'Eres un asistente útil.' },
					...newMessages,
				],
			}),
		});

		const data = await res.json();
		const botReply = data.choices?.[0]?.message?.content ?? '[Sin respuesta]';

		setMessages([...newMessages, { role: 'assistant', content: botReply }]);
		setLoading(false);
	};

	return (
		<div className="mx-auto w-full max-w-4xl">
			{/* Header */}
			<header className="flex items-center justify-between mb-6">
				<div>
					<h1 className="flex items-center gap-3 text-2xl font-semibold text-gray-800 dark:text-gray-100">
						<span className="text-amber-500">💬</span>
						ChatBot
					</h1>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Una UI simple inspirada en ChatGPT — prueba escribir algo
					</p>
				</div>
				<div className="hidden sm:flex items-center gap-3">
					<span className="text-sm text-amber-400">Modo demo</span>
					<button
						type="button"
						className="px-3 py-1 rounded-md bg-white/60 dark:bg-gray-800/60 text-sm border"
					>
						Acciones
					</button>
				</div>
			</header>

			{/* Container */}
			<div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
				{/* Messages area */}
				<div
					ref={scrollRef}
					className="h-[60vh] md:h-[65vh] lg:h-[70vh] p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
				>
					{messages.length === 0 && (
						<div className="flex justify-center">
							<div className="text-sm text-gray-400">
								Aún no hay mensajes — escribe abajo para empezar
							</div>
						</div>
					)}

					{messages.map((msg, i) => (
						<div
							key={i}
							className={`max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
						>
							<div
								className={`rounded-xl py-3 px-4 shadow-sm ${msg.role === 'user' ? 'bg-amber-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'}`}
							>
								<div className="text-sm leading-relaxed whitespace-pre-wrap">
									{msg.content}
								</div>
							</div>
							<div
								className={`text-xs mt-1 ${msg.role === 'user' ? 'text-right text-gray-400' : 'text-left text-gray-400'}`}
							>
								{msg.role === 'user' ? 'Tú' : 'Bot'}
							</div>
						</div>
					))}

					{loading && (
						<div className="max-w-[60%] mr-auto">
							<div className="rounded-xl py-3 px-4 shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100">
								⏳ Pensando...
							</div>
						</div>
					)}
				</div>

				{/* Input area */}
				<div className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3 items-center">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSend()}
						placeholder="Escribe tu mensaje..."
						className="flex-1 bg-transparent outline-none placeholder:text-gray-400 text-gray-900 dark:text-gray-100 text-sm"
						disabled={loading}
					/>

					<button
						onClick={handleSend}
						disabled={loading}
						className="inline-flex items-center gap-2 rounded-md bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-4 py-2 text-sm shadow-sm"
						type="button"
					>
						Enviar
					</button>
				</div>
			</div>

			{/* Footer small note */}
			<p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
				Diseño con Tailwind — dime si quieres ajuste en colores, tamaños o
				comportamiento.
			</p>
		</div>
	);
}
