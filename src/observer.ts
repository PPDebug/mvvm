export class Observer{
    data:any;

    constructor(data:any) {
        this.data = data;
    }

    walk(data) {
        Object.keys(data).forEach((key)=>{
            this.defineReactive(this.data, key, this.data[key]);
        })
    }

    defineReactive(data:any, key:any, val:any) {
        let dep = new Dep();
        let childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: ()=>{
                return val;
            },
            set: function(newVal) {
                if (newVal===val){
                    return ;
                }
                val = newVal;
                childObj = observe(newVal);
                dep.notify();
            }
        })
    }
}

function observe(value){
    if (!value || typeof value !== 'object') {
        return null;
    }

    return new Observer(value);
}

class Dep {

    id: any ;
    subs: any;
    static uid = 0;
    static target = null;

    constructor(){
        this.id = Dep.uid++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
       Dep.target.addDep(this);
    }

    removeSub(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    }

    notify() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}