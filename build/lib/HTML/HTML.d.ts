import { recurrentArray } from "../StdLib/stdlib.js";
declare type attribute = {
    [key: string]: string | number;
};
declare global {
    interface Element {
        setAttributes: (attributes: attribute) => Element;
        setText: (text: string) => Element;
        appendChildren: (elements: recurrentArray<Element>) => Element;
    }
}
export declare class SVG {
    static svg(attributes?: attribute, text?: string, children?: recurrentArray<Element>): SVGSVGElement;
    static g(attributes?: attribute, text?: string, children?: recurrentArray<Element>): SVGGElement;
    static rect(attributes?: attribute, text?: string, children?: recurrentArray<Element>): SVGRectElement;
    static line(attributes?: attribute, text?: string, children?: recurrentArray<Element>): SVGLineElement;
    static text(attributes?: attribute, text?: string, children?: recurrentArray<Element>): SVGTextElement;
}
export declare class HTML {
    static get base(): HTMLBaseElement;
    static get head(): HTMLHeadElement;
    static get body(): HTMLBodyElement;
    static get title(): HTMLTitleElement;
    static div(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLDivElement;
    static span(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLSpanElement;
    static p(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLParagraphElement;
    static h1(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLHeadingElement;
    static h2(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLHeadingElement;
    static h3(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLHeadingElement;
    static h4(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLHeadingElement;
    static h5(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLHeadingElement;
    static h6(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLHeadingElement;
    static ol(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLOListElement;
    static li(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLLIElement;
    static script(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLScriptElement;
    static link(attributes?: attribute, text?: string, children?: recurrentArray<Element>): HTMLLinkElement;
}
export {};
