import Subject from "../subject"
import Observer from "../observer"

let originalLog: any;
beforeAll(() => { // 可以换成 beforeEach
    // 保留原 console 函数引用
    originalLog = global.console.log;
    // 用 jest.fn() 替换，方便模拟
    global.console.log = jest.fn();
});
afterAll(() => { // 可以换成 afterEach
    // 恢复原 console 函数引用
    global.console.log = originalLog;
});

let sub = new Subject();
let callback = ()=>{};
for(let i=0; i<10; i++) {
    sub.attach(new Observer(1, "somedata", callback));
}

test("添加观察者时，应当去重", () => {
  expect(sub.observers.length).toBe(1);
});

// test("observers updated", () => {
//     sub.notify();
//     expect(global.console.log).toHaveBeenCalledWith("updated");
//   });
  
