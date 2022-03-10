import { NUMBER_REGEXP } from "../constants";
import Decimal, { DecimalType } from "../utils/math";

export default (value: undefined|DecimalType): string => {
    const num_match = String(value).match(NUMBER_REGEXP);
    value = Decimal(num_match[1]);
    if (value.lt(0)) value = Decimal(0);
    if (value.gt(255)) value = Decimal(255);

    return value;
};
