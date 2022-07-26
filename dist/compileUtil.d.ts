export default class CompileUtil {
    static updater: {
        textUpdater: (node: any, value: any) => void;
        htmlUpdater: (node: any, value: any) => void;
        classUpdater: (node: any, value: any, oldValue: any) => void;
        modelUpdater: (node: any, value: any, oldValue: any) => void;
    };
    constructor();
    static text(node: any, vm: any, exp: any): void;
    static html(node: any, vm: any, exp: any): void;
    static model(node: any, vm: any, exp: any): void;
    static class(node: any, vm: any, exp: any): void;
    static bind(node: any, vm: any, exp: any, dir: any): void;
    static eventHandler(node: any, vm: any, exp: any, dir: any): void;
    static _getVMVal(vm: any, exp: any): any;
    static _setVMVal(vm: any, exp: any, value: any): void;
}
//# sourceMappingURL=compileUtil.d.ts.map