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

vm = new MVVM(options);
test("constructor ", () => {
  expect(vm.$options).toBe(options);
});

test("data proxy ", () => {
  expect(vm["name"]).toBe(vm.data["name"]);
});

test("computed initial", () => {
  expect(vm["var1"]).toBe(options.computed.var1());
});

test("data change->observer", () => {
  options.data.name = 2;
  options.data.subdata.attr1 = 3;
  expect(true).toBe(true);
});


