import {create} from './create.js';
import Div from '../container.js';

const PROPERTY_SYMBOL = Symbol("property");
const ATTRIBUTE_SYMBOL = Symbol("attribute");
const EVENT_SYMBOL = Symbol("event");
const STATE_SYMBOL = Symbol("state");

export default class ListView {
    constructor(config) {
        this[PROPERTY_SYMBOL] = Object.create(null);
        this[ATTRIBUTE_SYMBOL] = Object.create(null);
        this[EVENT_SYMBOL] = Object.create(null);
        this[STATE_SYMBOL] = Object.create(null);


        this[PROPERTY_SYMBOL].children = [];

        this.created();
    }

    appendTo(element) {
        element.appendChild(this.root);
        this.mounted();
    }

    created() {
        this.root = document.createElement("div");
    }

    mounted() {

    }

    unmounted() {

    }

    update() {

    }

    render() {
        let data = this[ATTRIBUTE_SYMBOL]['data'] || [];
        return <div>
            {
                data.map(item => {
                    return <div><span>{item.abc}</span></div>;
                })
            }
        </div>;
    }

    appendChild(child) {
        this.children.push(child);
        child.appendTo(this.root);
    }


    get children() {
        return this[PROPERTY_SYMBOL].children;
    }

    getAttribute(name) {
        if (name === "style") {
            return this.root.getAttribute("style");
        }
        return this[ATTRIBUTE_SYMBOL][name]
    }

    setAttribute(name, value) {
        if (name === "style") {
            this.root.setAttribute("style", value);
        }
        if (name === 'data') {
            this[ATTRIBUTE_SYMBOL][name] = value;
            this.root.innerHTML = "";
            this.render().appendTo(this.root);
            return value;
        }
        return this[ATTRIBUTE_SYMBOL][name] = value;
    }

    addEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            this[EVENT_SYMBOL][type] = new Set;
        this[EVENT_SYMBOL][type].add(listener);
    }

    removeEventListener(type, listener) {
        if (!this[EVENT_SYMBOL][type])
            return;
        this[EVENT_SYMBOL][type].delete(listener);
    }

    triggerEvent(type, ...args) {
        if (!this[EVENT_SYMBOL][type]) {
            return;
        }

        for (let event of this[EVENT_SYMBOL][type]) {
            event.call(this, ...args);
        }

    }
}