import { FirestoreCollectionNames, FirestoreCollections } from './FirestoreCollections';

type ConvertFn<T> = (value: any) => T;
type TypeConverter<T> = { [field in keyof T]: ConvertFn<T[field]> };
type FieldConverters<T> = Partial<TypeConverter<T>>;
export type FirestoreCollectionFieldConverter<T extends FirestoreCollectionNames> = FieldConverters<FirestoreCollections[T]>;
