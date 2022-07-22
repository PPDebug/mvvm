interface Options {
    el: any,
    data: any,
    method: any,
    computed: object,
}

class MVVM{
    public $options : Options;
    public data: any;
    public $watch: any;

    constructor(options: Options) {
        this.$options = options;
        this.data = this.$options.data;
    };

    public init() {
        // 数据代理 vm.xxx -> vm._data.xxx
        Object.keys(this.data).forEach((key)=>{
            this._proxyData(key);
        })

        // computed属性初始化
        this._initComputed();


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

}


export {
    MVVM 
}