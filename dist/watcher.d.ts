export declare class Watcher {
    callback: Function;
    vm: any;
    expOrFn: any;
    depIds: any;
    value: any;
    getter: Function;
    constructor(vm: any, expOrFn: any, callback: Function);
    update(): void;
    run(): void;
    addDep(dep: any): void;
    get(): any;
    static parseGetter(exp: string): (obj: any) => any;
}
//# sourceMappingURL=watcher.d.ts.map