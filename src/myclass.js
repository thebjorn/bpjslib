
function isProps(obj) {
    const obj_like = obj != null && typeof obj == 'object';
    const tag = Object.prototype.toString.call(obj);
    if (!obj_like || tag !== '[object Object]') return false;
    const proto = Object.getPrototypeOf(Object(obj));
    if (proto === null) return true;
    const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof ctor == 'function' && ctor instanceof ctor &&
        Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
}

class Base {
    constructor(...args) {
        let props = {};
        if (args.length === 1) {
            props = args[0];
        } else if (Array.from(args).every(a => isProps(a))) {
            props = Object.assign(props, ...args);
        } else {
            props = args;
        }
        if (isProps(props)) {
            for (const attr in props) if (props.hasOwnProperty(attr)) {
                let propval = props[attr];
                this[attr] = propval;
            }
        }
    }
}


export class MyClass extends Base {
    constructor(...args) {
        super({
            myval: 42
        }, ...args);
    }
}
