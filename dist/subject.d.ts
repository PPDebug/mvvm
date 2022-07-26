import Observer from "./observer";
export default class Subject {
    observers: Observer[];
    constructor();
    attach(o: Observer): void;
    dettach(o: Observer): void;
    notify(newVal: any): void;
}
//# sourceMappingURL=subject.d.ts.map