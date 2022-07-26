import { MVVM } from "./mvvm";
export default class Compile {
    $el: HTMLElement;
    $fragment: DocumentFragment;
    $vm: MVVM;
    constructor(el: any, vm: MVVM);
    node2Fragment(el: HTMLElement): DocumentFragment;
    compileElement(el: DocumentFragment): void;
    compile(node: any): void;
    compileText(node: any, exp: any): void;
    private isDirective;
    private iseventDirectve;
    private isElementNode;
    private isTextNode;
}
//# sourceMappingURL=compile.d.ts.map