export default class Observer{
    vm: any;
    expOrFn: any;
    callback: Function;
    getter: any;
    data: any;

    constructor(vm:any, expOrFn:any, callback:Function) {
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.callback = callback;

        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = this.parseGetter(expOrFn.trim());
        }
        this.data = this.get();

        console.log("bind->", this.data, "exp->", this.expOrFn);
    }


    public update(){
        let data = this.get();
        let oldData = this.data;
        console.log(this);

        if (data !== oldData) {
            console.log(oldData, data);
            this.data = oldData;
            this.callback.call(this.vm, data, oldData);
        }
    }

    private get(){
        return this.getter.call(this.vm, this.vm);
    }

    private parseGetter(exp: string) {
        
        if (/[^\w.$]/.test(exp)) return ()=>{}; 

        var exps = exp.split('.');
        const getter = (obj) => {
            // let obj = this.vm;
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        };
        return getter;
    }
}