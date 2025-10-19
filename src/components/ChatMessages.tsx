import type { Message } from '../types/chat';

interface Props {
	messages: Message[];
	loading: boolean;
}

export function ChatMessages({ messages, loading }: Props) {
	return (
		<div className="flex-1 p-6 overflow-y-auto space-y-4">
			{messages.map((m, i) => (
				<div key={i}>
					<pre>{m.content}</pre>
				</div>
			))}

			{loading && <p>Pensando...</p>}
		</div>
	);
}
