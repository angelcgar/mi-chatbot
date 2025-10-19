interface InputProps {
	value: string;
	disabled: boolean;
	onSend: () => void;
	onChange: (v: string) => void;
}

export function ChatInput({ value, disabled, onSend, onChange }: InputProps) {
	return (
		<div className="p-4 border-t flex gap-3">
			<input
				className="flex-1 shadow-2xl bg-neutral-800  text-white px-4 py-2 border-none outline-none focus:outline-none focus:ring-0 rounded-full"
				value={value}
				disabled={disabled}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => e.key === 'Enter' && onSend()}
			/>
			<button
				onClick={onSend}
				disabled={disabled}
				type="button"
				className="bg-blue-500 text-white px-4 py-2 disabled:bg-blue-300 rounded-full"
			>
				Enviar
			</button>
		</div>
	);
}
