type FieldPicker<T, TKey extends keyof T> = T[TKey];
export type ObjectEntries<T> = {[field in keyof T]: [field, FieldPicker<T, field>]}[keyof T][];
