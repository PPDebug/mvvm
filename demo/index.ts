import MVVM from "../src/index"

let vm = new MVVM({
    el: '#mvvm-app',
    data: {
        someStr: 'hello ',
        className: 'whiteColor',
        htmlStr: '<span style="color: #f00;">inner html: red text</span>',
        child: {
            someStr: 'World !'
        }
    },

    computed: {
        getHelloWord: function(){
            // return this.someStr + this.child.someStr;
            return this['someStr'] + this['child']['someStr'];
        }
    },

    methods: {
        clickBtn: function() {
            var randomStrArr = ['childOne', 'childTwo', 'childThree'];
            this.child.someStr = randomStrArr[parseInt(Math.random() * 3 + "")];
        }
    }
});

vm.$watch('child.someStr', function() {
    console.log(arguments);
});