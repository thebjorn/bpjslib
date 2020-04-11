import { MyClass } from "../myclass"


test('test-myclass', () => {
    const myclass = new MyClass();
    expect(myclass.myval).toBe(42);
});
