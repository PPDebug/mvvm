import { MVVM } from "../mvvm";
import "jest";

const options = {
  el: "#main-app",
  data: {
    name: 1,
    subdata: {
      attr1: 1,
      attr2: 2
    }
  },
  methods: "not finished",
  computed: {
    var1: function () {
      return 1;
    },
  },
};

let vm: MVVM;

test("pass", ()=>{
  expect(true).toBe(true);
}) 

// test("constructor ", () => {
//   vm = new MVVM(options);
//   expect(vm.$options).toBe(options);
//   expect(vm["name"]).toBe(vm.data["name"]);
//   expect(vm["var1"]).toBe(options.computed.var1());

//   options.data.name = 2;
//   options.data.subdata.attr1 = 3;
//   expect(true).toBe(true);
// });


