import { ALPHA_REGEXP, NUMBER_REGEXP, PERCENTAGE_REGEXP } from "../constants";
import Decimal, { DecimalType } from "../utils/math";
import parsePercent from "./percent";

export default (value: undefined|DecimalType): string => {
    const alpha_match = String(value).match(ALPHA_REGEXP);
    if (!alpha_match) throw new Error(`Invalid <alpha> => ${value}`);
    if (PERCENTAGE_REGEXP.test(value)) return parsePercent(value);

    const num_match = String(value).match(NUMBER_REGEXP);
    value = Decimal(num_match[1]).mul(100);
    if (value.lt(0)) value = Decimal(0);
    if (value.gt(100)) value = Decimal(100);

    return value;
};
