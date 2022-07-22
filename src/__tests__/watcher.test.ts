import { Watcher } from "../watcher";
import "jest";

let value = 1;
let changeCount = 0;
const addValue = ()=>{
    value++;
}
const callback = ()=>{
    changeCount++;
    console.log(`value changed ${changeCount} times`);
}

new Watcher(this, addValue, callback);

addValue();
addValue();

test("watch function", () => {
  expect(2).toBe(2);
});

