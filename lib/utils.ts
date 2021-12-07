export const isCMYK = (props: any): boolean => {
    return 'cyan' in props && props.cyan !== undefined
        && 'magenta' in props && props.magenta !== undefined
        && 'yellow' in props && props.yellow !== undefined
        && 'black' in props && props.black !== undefined
    ;
};

export const isSCMYK = (props: any): boolean => {
    return 'c' in props && props.c !== undefined
        && 'm' in props && props.m !== undefined
        && 'y' in props && props.y !== undefined
        && 'k' in props && props.k !== undefined
    ;
};

export const isHEX = (props: any): boolean => {
    return 'hex' in props && props.hex !== undefined;
};

export const isHSL = (props: any): boolean => {
    return 'hue' in props && props.hue !== undefined
        && 'saturation' in props && props.saturation !== undefined
        && 'lightness' in props && props.lightness !== undefined
    ;
};

export const isSHSL = (props: any): boolean => {
    return 'h' in props && props.h !== undefined
        && 's' in props && props.s !== undefined
        && 'l' in props && props.l !== undefined
    ;
};

export const isHWB = (props: any): boolean => {
    return 'hue' in props && props.hue !== undefined
        && 'white' in props && props.white !== undefined
        && 'black' in props && props.black !== undefined
    ;
};

export const isSHWB = (props: any): boolean => {
    return 'h' in props && props.h !== undefined
        && 'w' in props && props.w !== undefined
        && 'b' in props && props.b !== undefined
    ;
};

export const isINT = (props: any): boolean => {
    return 'value' in props && props.value !== undefined;
};

export const isNCOL = (props: any): boolean => {
    return 'ncol' in props && props.ncol !== undefined
        && 'white' in props && props.white !== undefined
        && 'black' in props && props.black !== undefined
    ;
};

export const isRGB = (props: any): boolean => {
    return 'red' in props && props.red !== undefined
        && 'green' in props && props.green !== undefined
        && 'blue' in props && props.blue !== undefined
    ;
};

export const isSRGB = (props: any): boolean => {
    return 'r' in props && props.r !== undefined
        && 'g' in props && props.g !== undefined
        && 'b' in props && props.b !== undefined
    ;
};
