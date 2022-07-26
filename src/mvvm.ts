import Subject from "./subject"
import Observer from "./observer"
import Compile from './compile'

interface Options {
    el: any,
    data: any,
    methods: any,
    computed: object,
}

class MVVM{
    public $options : Options;
    public data: any;
    public $watch: any;

    subs: Subject[];

    constructor(options: Options) {
        this.$options = options;
        this.data = this.$options.data;
        this.subs = [];

        this.init();
    };

    private init() {
        // 数据代理 vm.xxx -> vm._data.xxx
        Object.keys(this.data).forEach((key)=>{
            this._proxyData(key);
        })

        // computed属性初始化
        this._initComputed();
        // this.observe(this.data);

        new Compile(this.$options.el, this);

    };

    private _proxyData(key:any) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: ()=>{
                return this.data[key];
            }
        })
    };

    private _initComputed() {
        let computed = this.$options.computed;
        Object.keys(computed).forEach((key) => {
            Object.defineProperty(this, key, {
                configurable: false,
                enumerable: true,
                get: computed[key],
                set: function(){},
            })
        })
    }

    observe(data: Object) {
        Object.keys(data).forEach((key: any)=> {
            this.defineProperty(data, key, data[key])
        })
    }

    private defineProperty(data: Object, key: any, val: any) {
        let sub = new Subject();
        this.subs.push(sub);
        sub.attach(new Observer(val));
        this.observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                return val;
            },
            set: function(newVal: any) {
                if (val === newVal) return;
                sub.notify(newVal);
                val = newVal;
            }
        })
    }
}


export {
    MVVM 
}