import { Arraying } from "./stdlib.js"

type attribute = { [key: string]: string }

declare global {
	interface Element {
		set: (attributes: attribute) => Element
		setText: (text: string) => Element
		append: (elements: Element | Element[]) => Element
	}
}

Element.prototype.set = function (attributes) {
	for (const key in attributes) { this.setAttribute(key, attributes[key]); }
	return this;
}
Element.prototype.setText = function (text) {
	this.appendChild(document.createTextNode(text));
	return this;
}
Element.prototype.append = function (elements) {
	for (const e of Arraying(elements)) { this.appendChild(e); }
	return this;
}

export function htmlElement<T extends keyof HTMLElementTagNameMap>(tag: T, attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) {
	const e = document.createElement<T>(tag)
	for (const k in attributes) { e.setAttribute(k, attributes[k]) }
	e.appendChild<Text>(document.createTextNode(text))
	Arraying(children).forEach(child => e.appendChild(child))
	return e
}

export default class {
	// getters
	//get  () { return document.getElementsByTagName("") }
	static get base() { return document.getElementsByTagName("base")[0] }
	static get head() { return document.getElementsByTagName("head")[0] }
	static get body() { return document.getElementsByTagName("body")[0] }
	static get title() { return document.getElementsByTagName("title")[0] }

	// creators
	//(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("", attributes, text, children) }
	static div(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("div", attributes, text, children) }
	static span(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("span", attributes, text, children) }
	static p(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("p", attributes, text, children) }
	static h1(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("h1", attributes, text, children) }
	static h2(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("h2", attributes, text, children) }
	static h3(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("h3", attributes, text, children) }
	static h4(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("h4", attributes, text, children) }
	static h5(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("h5", attributes, text, children) }
	static h6(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("h6", attributes, text, children) }
	static ol(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("ol", attributes, text, children) }
	static li(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("li", attributes, text, children) }
}