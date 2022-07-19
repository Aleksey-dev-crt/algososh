import { ElementStates } from '../types/element-states';
import { TQueueElement } from '../types/element-types';

interface IQueue<T> {
	enqueue: (item: T) => void;
	dequeue: () => void;
	getHead: () => T | null;
	getTail: () => T | null;
	getElements: () => (T | null)[];
	clear: () => (T | null)[];
}

class Queue<T> implements IQueue<T> {
	private container: T[] = [];
	public head = 0;
	public tail = 0;
	private readonly size: number = 0;
	private readonly defaultElement: T;
	public length: number = 0;

	constructor(size: number, defaultElement: T) {
		this.size = size;
		this.defaultElement = defaultElement;
		this.container = Array.from({ length: size }, () => defaultElement);
	}

	enqueue = (item: T) => {
		if (this.length >= this.size || this.head + 1 >= this.size) {
			return;
		}

		this.container[this.tail] = item;
		this.tail++;
		this.length++;
	};

	dequeue = () => {
		if (this.isEmpty()) {
			return;
		}
		if (this.head === null) return;

		this.container[this.head] = this.defaultElement;
		this.head++;
		this.length--;
	};

	getHead = () => {
		if (this.isEmpty()) {
			return this.defaultElement;
		}
		return this.container[this.head];
	};

	getTail = () => {
		if (this.isEmpty()) {
			return this.defaultElement;
		}
		return this.container[this.tail - 1];
	};

	getElements = () => this.container;

	isEmpty = () => this.length < 1;

    clear = () => {
        this.length = 0
        this.head = 0
        this.tail = 0
        return this.container = Array.from({ length: this.size }, () => this.defaultElement);
    } 
}

export const qe = new Queue<TQueueElement>(7, {
	element: '',
	state: ElementStates.Default,
	head: '',
	tail: '',
});
