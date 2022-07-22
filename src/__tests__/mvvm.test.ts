import { MVVM } from "../index";
import "jest";

const options = {
  el: "#main-app",
  data: {
    name: 1,
  },
  method: "not finished",
  computed: {
    var1: function () {
      return 1;
    },
  },
};

let vm: MVVM;

vm = new MVVM(options);
test("constructor ", () => {
  expect(vm.$options).toBe(options);
});

vm.init();

test("data proxy ", () => {
  expect(vm["name"]).toBe(vm.data["name"]);
});

test("computed initial", () => {
  expect(vm["var1"]).toBe(options.computed.var1());
});
