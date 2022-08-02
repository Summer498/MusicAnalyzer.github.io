import { Arraying } from "./stdlib.js";
Element.prototype.set = function (attributes) {
    for (const key in attributes) {
        this.setAttribute(key, attributes[key]);
    }
    return this;
};
Element.prototype.setText = function (text) {
    this.appendChild(document.createTextNode(text));
    return this;
};
Element.prototype.append = function (elements) {
    for (const e of Arraying(elements)) {
        this.appendChild(e);
    }
    return this;
};
export function htmlElement(tag, attributes, text = "", children = []) {
    const e = document.createElement(tag);
    for (const k in attributes) {
        e.setAttribute(k, attributes[k]);
    }
    e.appendChild(document.createTextNode(text));
    Arraying(children).forEach(child => e.appendChild(child));
    return e;
}
export default class {
    // getters
    //get  () { return document.getElementsByTagName("") }
    static get base() { return document.getElementsByTagName("base")[0]; }
    static get head() { return document.getElementsByTagName("head")[0]; }
    static get body() { return document.getElementsByTagName("body")[0]; }
    static get title() { return document.getElementsByTagName("title")[0]; }
    // creators
    //(attributes: attribute, text: string = "", children: HTMLElement | HTMLElement[] = []) { return htmlElement("", attributes, text, children) }
    static div(attributes, text = "", children = []) { return htmlElement("div", attributes, text, children); }
    static span(attributes, text = "", children = []) { return htmlElement("span", attributes, text, children); }
    static p(attributes, text = "", children = []) { return htmlElement("p", attributes, text, children); }
    static h1(attributes, text = "", children = []) { return htmlElement("h1", attributes, text, children); }
    static h2(attributes, text = "", children = []) { return htmlElement("h2", attributes, text, children); }
    static h3(attributes, text = "", children = []) { return htmlElement("h3", attributes, text, children); }
    static h4(attributes, text = "", children = []) { return htmlElement("h4", attributes, text, children); }
    static h5(attributes, text = "", children = []) { return htmlElement("h5", attributes, text, children); }
    static h6(attributes, text = "", children = []) { return htmlElement("h6", attributes, text, children); }
    static ol(attributes, text = "", children = []) { return htmlElement("ol", attributes, text, children); }
    static li(attributes, text = "", children = []) { return htmlElement("li", attributes, text, children); }
}
