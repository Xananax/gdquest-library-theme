/**
 * Shortcut for Object.getPrototypeOf
 */
export const protoOf = Object.getPrototypeOf;
/**
 * Object prototype, used it for comparisons
 */
export const objProto = protoOf({});


export const isObject = (value: any): value is Record<string,any> => typeof value === 'object' && protoOf(value) === objProto;