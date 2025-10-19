import { useState } from 'react';
import type { Message } from '../types/chat';
import { sendToModel } from '../services/chatService';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export default function ChatBot() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSend() {
		if (!input.trim()) return;

		const next: Message[] = [...messages, { role: 'user', content: input }];

		setMessages(next);
		setInput('');
		setLoading(true);

		const reply = await sendToModel(next);

		setMessages([...next, { role: 'assistant', content: reply }]);
		setLoading(false);
	}

	return (
		<div className="w-screen h-screen flex flex-col bg-gray-50 dark:bg-neutral-900">
			{messages.length === 0 && (
				<header>
					<h3 className="text-center text-sm text-gray-400 dark:text-gray-500 mb-2">
						app gpt inteligente
					</h3>
				</header>
			)}
			<ChatMessages messages={messages} loading={loading} />
			<ChatInput
				value={input}
				disabled={loading}
				onSend={handleSend}
				onChange={setInput}
			/>
		</div>
	);
}
