import Decimal from "decimal.js";

export default new Proxy(Decimal, {
    apply(target: Decimal, thisArg: any, argArray: any[]): Decimal {
        return new Decimal(...argArray);
    },
});

export const P = 10;
export const PI = Decimal.acos(-1);
export const PI2 = PI.mul(2);
