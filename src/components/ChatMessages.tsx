import type { Message } from '../types/chat';

interface Props {
	messages: Message[];
	loading: boolean;
}

export function ChatMessages({ messages, loading }: Props) {
	return (
		<div className="flex-1 p-6 overflow-y-auto space-y-4">
			{messages.map((m, i) => (
				<div
					key={i}
					className={`max-w-4xl ${m.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
				>
					<div
						className={`rounded-xl py-3 px-4 shadow-sm ${m.role === 'user' ? 'bg-amber-400/80 dark:bg-neutral-800' : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-100 rounded-bl-none'}`}
					>
						<div className="text-sm leading-relaxed whitespace-pre-wrap max-w-prose">
							{m.content}
						</div>
					</div>
					<div
						className={`text-xs mt-1 ${m.role === 'user' ? 'text-right text-gray-400' : 'text-left text-gray-400'}`}
					>
						{m.role === 'user' ? 'Tú' : 'Bot'}
					</div>
				</div>
			))}

			{loading && <p>Pensando...</p>}
		</div>
	);
}
