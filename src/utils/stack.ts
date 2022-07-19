import { TStackElement } from "../types/element-types";

interface IStack<T> {
	push: (item: T) => void;
	pop: () => void;
	clear: () => T[];
	getElements: () => T[];
	getSize: () => number;
}

class Stack<T> implements IStack<T> {
	private container: T[] = [];

	push = (item: T): void => {
		this.container.push(item);       
	};

	pop = (): void => {
		this.container.pop();
	};

	clear = (): T[] => {
		return this.container = []
	};

    getElements = () => this.container;

	getSize = () => this.container.length;
}

export const st = new Stack<TStackElement>()
