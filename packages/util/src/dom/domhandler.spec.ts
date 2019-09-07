import { DomHandler } from './domhandler';

describe('DomHandler', () => {

    it('should add single and multiple class to element', () => {
        const element = document.createElement("div");
        DomHandler.addClass(element,"pixelmon");
        const mockElement = {classList:undefined,className:""};
        DomHandler.addClass(mockElement,"pixelmon");
        expect(element.classList).toContain("pixelmon");
        expect(mockElement.className).toContain("pixelmon");
        DomHandler.addMultipleClasses(element,"rocks! vamos!");
        DomHandler.addMultipleClasses(mockElement,"rocks! vamos!");
        expect(element.classList.value).toContain("pixelmon rocks! vamos!");
        expect(mockElement.className).toContain("rocks! vamos!");
    });

    it('should remove class from element', () => {
        const element = document.createElement("div");
        DomHandler.addClass(element,"pixelmon");
        const mockElement = {classList:undefined,className:""};
        DomHandler.addClass(mockElement,"pixelmon");
        DomHandler.removeClass(element,"pixelmon");
        DomHandler.removeClass(mockElement,"pixelmon");
        expect(element.classList).not.toContain("pixelmon");
        expect(mockElement.className).not.toContain("pixelmon");
    });

    it('should check elemets class', () => {
        const element = document.createElement("div");
        DomHandler.addClass(element,"pixelmon");
        const mockElement = {classList:undefined,className:""};
        DomHandler.addClass(mockElement,"pixelmon");
        expect(DomHandler.hasClass(element,"pixelmon")).toBeTruthy();
        expect(DomHandler.hasClass(mockElement,"pixelmon")).toBeTruthy();
    });

    it('should get siblings', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("span");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(DomHandler.siblings(element.children[0]).length).toEqual(2);
    });

    it('should remove child', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("span");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        DomHandler.removeChild(element.children[1],element);
        expect(element.children.length).toEqual(2);
    });

    it('should check value isInteger', () => {
        expect(DomHandler.isInteger(5)).toBeTruthy();
        expect(DomHandler.isInteger("5")).toBeFalsy();
    });

    it('should find element', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        DomHandler.addClass(childEl,"pixelmon");
        DomHandler.addClass(childEl3,"pixelmon");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(DomHandler.find(element,"a").length).toEqual(2);
        expect(DomHandler.findSingle(element,"a")).toBeTruthy();
        expect(DomHandler.findSingle(null,"a")).toBeNull();
    });

    it('should find index', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        DomHandler.addClass(childEl,"pixelmon");
        DomHandler.addClass(childEl3,"pixelmon");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(DomHandler.index(element.children[2])).toEqual(2);
    });

    it('should find index with indexWithinGroup', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        childEl2.setAttribute("pixelmon","rocks!");
        childEl3.setAttribute("pixelmon","rocks!");
        DomHandler.addClass(childEl,"pixelmon");
        DomHandler.addClass(childEl3,"pixelmon");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(DomHandler.indexWithinGroup(element.children[2],"pixelmon")).toEqual(1);
    });

    it('should use relativePosition', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        childEl2.setAttribute("pixelmon","rocks!");
        childEl3.setAttribute("pixelmon","rocks!");
        DomHandler.addClass(childEl,"pixelmon");
        DomHandler.addClass(childEl3,"pixelmon");
        element.style.height = "200px";
        element.style.width = "200px";
        childEl3.style.height = "100px";
        childEl3.style.width = "100px";
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        DomHandler.relativePosition(element.children[2],element);
        expect(childEl3.style.top).toEqual("0px");
        expect(childEl3.style.left).toEqual("0px");
    });

    it('should use absolutePosition', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        childEl2.setAttribute("pixelmon","rocks!");
        childEl3.setAttribute("pixelmon","rocks!");
        DomHandler.addClass(childEl,"pixelmon");
        DomHandler.addClass(childEl3,"pixelmon");
        element.style.height = "200px";
        element.style.width = "200px";
        childEl3.style.height = "100px";
        childEl3.style.width = "100px";
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        DomHandler.absolutePosition(element.children[2],element);
        expect(childEl3.style.top).toEqual("0px");
        expect(childEl3.style.left).toEqual("0px");
    });

    it('should get hidden element height and width', () => {
        const element = document.createElement("div");
        element.style.height = "0px";
        element.style.width = "0px";
        expect(DomHandler.getHiddenElementOuterHeight(element)).toEqual(0);
        expect(DomHandler.getHiddenElementOuterWidth(element)).toEqual(0);
    });
});
