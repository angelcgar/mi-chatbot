import type { Message } from '../types/chat';

export async function sendToModel(messages: Message[]): Promise<string> {
	// console.log(import.meta.env.VITE_SECRET_KEY_OPENROUTER);
	const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
		method: 'POST',
		headers: {
			Authorization: `Bearer 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`,
			'Content-Type': 'application/json',
			'HTTP-Referer': 'http://localhost',
			'X-Title': 'mi-chatbot',
		},
		body: JSON.stringify({
			model: 'mistralai/mistral-7b-instruct',
			messages: [
				{ role: 'system', content: 'Eres un asistente útil.' },
				...messages,
			],
		}),
	});

	// console.log('Respuesta status:', res.status);
	// console.log({ res });

	const data = await res.json();
	return data.choices?.[0]?.message?.content ?? '[Sin respuesta]';
}
