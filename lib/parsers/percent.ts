import { PERCENTAGE_REGEXP } from "../constants";
import Decimal from "../utils/math";

export default (value: number|string|undefined): string => {
    const per_match = String(value).match(PERCENTAGE_REGEXP);
    if (!per_match) throw new Error(`Invalid <percent> => ${value}`);
    value = Decimal(per_match[1]);
    if (value.lt(0)) value = Decimal(0);
    if (value.gt(100)) value = Decimal(100);

    return value;
};
