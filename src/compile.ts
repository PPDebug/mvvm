import { MVVM } from "./mvvm";
import CompileUtil from "./compileUtil";

export default class Compile {

    $el: HTMLElement;
    $fragment: DocumentFragment;
    $vm: MVVM;
    
    constructor(el: any, vm: MVVM) {
        this.$el = this.isElementNode(el)? el:document.querySelector(el);
        this.$vm = vm;

        if (!this.$el) return;

        this.$fragment = this.node2Fragment(this.$el);
        this.compileElement(this.$fragment);
        this.$el.appendChild(this.$fragment);
    }

    node2Fragment(el: HTMLElement) {
        let fragment = document.createDocumentFragment();
        let child;
        while (child=el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    compileElement(el: DocumentFragment) {
        let childNodes = el.childNodes;
        [].slice.call(childNodes).forEach((node)=>{
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/; // {{variable}}
            if(this.isElementNode(node)){
                this.compile(node);
            } else if (this.isTextNode(node) && reg.test(text)) {
                console.log(text);
                this.compileText(node, RegExp.$1.trim());
            }
            if(node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        })
    }

    compile(node) {
        let nodeAttrs = node.attributes;
        [].slice.call(nodeAttrs).forEach(attr=>{
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                let exp = attr.value;
                var dir = attrName.substring(2);
                if (this.isEventDirective(dir)) {
                    CompileUtil.eventHandler(node, this.$vm, exp, dir);
                } else {
                    CompileUtil[dir] && CompileUtil[dir](node, this.$vm, exp);
                }
                node.removeAttribute(attrName);
            }
        })
    }

    compileText(node, exp) {
        CompileUtil.text(node, this.$vm, exp);
    }

    private isDirective(attr: any) {
        return attr.indexOf("v-") == 0;
    }

    private isEventDirective(dir: any) {
        return dir.indexOf('on') == 0;
    }

    private isElementNode(node: any) {
        return node.nodeType == 1;
    }

    private isTextNode(node: any) {
        return node.nodeType == 3;
    }
}