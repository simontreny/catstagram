import { Signal } from "micro-signals";
import { useEffect, useState } from "react";

export function useSignal<T>(signal: Signal<T>, listener: (value: T) => void) {
	useEffect(() => {
		signal.add(listener);
		return () => signal.remove(listener);
	}, []);
}

export function useChangingValue<T>(initialValue: T, changeSignal: Signal<T>) {
	const [val, setVal] = useState(initialValue);
	useSignal(changeSignal, setVal);
	return val;
}
