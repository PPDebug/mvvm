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
    public $watch: Function;
    public $compile: Compile;

    sub: Subject;

    constructor(options: Options) {
        this.$options = options;
        this.data = this.$options.data;
        this.sub = new Subject();

        this.init();
    };

    private init() {
        // 数据代理 vm.xxx -> vm._data.xxx
        Object.keys(this.data).forEach((key)=>{
            this._proxyData(key);
        })

        // computed属性初始化
        this._initComputed();
        this.observe(this.data);

        this.$watch = function(key:any, cb:Function) {
            this.sub.attach( new Observer(this, key, cb));
        }

        this.$compile = new Compile(this.$options.el || document.body, this);

    };

    private _proxyData(key:any) {
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            get: ()=>{
                return this.data[key];
            },
            set: (newVal: any)=>{
                this.data[key] = newVal;
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

    observe(data: any) {

        if(!data || typeof data !== 'object') return 

        Object.keys(data).forEach((key: any)=> {
            this.defineProperty(data, key, data[key])
        })
    }

    private defineProperty(data: Object, key: any, val: any) {
        this.sub.attach(new Observer(data, key, ()=>{
        }));
        this.observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function() {
                return val;
            },
            set: (newVal: any)=>{
                if (val === newVal) return;
                this.sub.notify();
                val = newVal;
            }
        })
    }
}


export {
    MVVM 
}