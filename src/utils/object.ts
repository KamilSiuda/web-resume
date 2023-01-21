import { ObjectEntries } from 'models/utils/ObjectEntries';

export function ObjectEntriesTyped<T extends {}> (obj: T): ObjectEntries<T> {
    return Object.entries(obj) as ObjectEntries<T>;
}
