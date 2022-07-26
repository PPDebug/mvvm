import Subject from "./subject";
interface Options {
    el: any;
    data: any;
    methods: any;
    computed: object;
}
declare class MVVM {
    $options: Options;
    data: any;
    $watch: any;
    subs: Subject[];
    constructor(options: Options);
    private init;
    private _proxyData;
    private _initComputed;
    observe(data: Object): void;
    private defineProperty;
}
export { MVVM };
//# sourceMappingURL=mvvm.d.ts.map