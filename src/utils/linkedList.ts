import { TListElement } from '../types/element-types';

export class LinkedListNode<T> {
	value: T;
	next: LinkedListNode<T> | null;
	constructor(value: T, next?: LinkedListNode<T> | null) {
		this.value = value;
		this.next = next === undefined ? null : next;
	}
}

interface ILinkedList<T> {
	prepend: (element: T) => void;
	append: (element: T) => void;
	deleteHead: () => LinkedListNode<T> | null;
	deleteTail: () => LinkedListNode<T> | null;
	addByIndex: (element: T, idx: number) => void;
	toArray: () => T[];
	fromArray: (elements: T[]) => ILinkedList<T>;
	getSize: () => number;
}

class LinkedList<T> implements ILinkedList<T> {
	private head: LinkedListNode<T> | null;
	private tail: LinkedListNode<T> | null;
	public size: number;
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	prepend(element: T) {
		const newNode = new LinkedListNode(element, this.head);
		this.head = newNode;
		if (!this.tail) this.tail = newNode;
		this.size++;
	}

	append(element: T) {
		const newNode = new LinkedListNode(element);
		if (this.tail) this.tail.next = newNode;
		this.tail = newNode;
		if (!this.head) this.head = newNode;
		this.size++;
	}

	deleteHead() {
		if (!this.head) return null;

		const deletedHead = this.head;

		if (this.head.next) {
			this.head = this.head.next;
		} else {
			this.head = null;
			this.tail = null;
		}
		this.size--;
		return deletedHead;
	}

	deleteTail() {
		if (!this.tail) return null;

		const deletedTail = this.tail;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
			return deletedTail;
		}

		let currentNode = this.head;
		while (currentNode!.next) {
			if (!currentNode!.next.next) {
				currentNode!.next = null;
			} else {
				currentNode = currentNode!.next;
			}
		}
		this.tail = currentNode;
		this.size--;

		return deletedTail;
	}

	addByIndex(element: T, idx: number) {
		if (idx < 0 || idx > this.size) return;

		const newNode = new LinkedListNode(element);
		let currentNode = this.head;
		let currIndex = 0;
		if (idx === 0) {
			this.prepend(element);
			return;
		}
		while (currIndex < idx - 1) {
			currentNode = currentNode!.next;
			currIndex++;
		}
		newNode.next = currentNode!.next;
		currentNode!.next = newNode;
		this.size++;
	}

	deleteByIndex(idx: number) {
		if (!this.size) return null;
		if (idx < 0 || idx > this.size) return;
		let currentNode = this.head;
		if (idx === 0) {
			this.deleteHead();
			return;
		}
		if (idx === this.size - 1) {
			this.deleteTail();
			return;
		}
		let currIndex = 0;
		while (currIndex < idx - 1) {
			currentNode = currentNode!.next;
			currIndex++;
		}
		currentNode!.next = currentNode!.next!.next;
		this.size--;
	}

	toArray() {
		const nodes = [];
		let currentNode = this.head;
		while (currentNode) {
			nodes.push(currentNode.value);
			currentNode = currentNode.next;
		}
		return nodes;
	}

	fromArray(elements: T[]) {
		elements.forEach((element) => this.append(element));
		return this;
	}

	getSize() {
		return this.size;
	}
}

export const linkedList = new LinkedList<TListElement>();
