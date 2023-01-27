import { useMemo } from 'react';

export type Order = 'asc' | 'desc';

function descendingComparator<T> (a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = <T, >(order: Order, orderBy: keyof T): (
    a: { [key in keyof T]: any },
    b: { [key in keyof T]: any }
) => number => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

type UseSortOptions<T> = {
    order: 'asc' | 'desc';
    orderBy: keyof T;
    sortTransform?: (item: T) => any
}
export const useSort = <T, >(items: Array<T>, options: UseSortOptions<T>) => {
    const { order, orderBy, sortTransform: transform } = options;

    const sortedItems = useMemo(() => {
        const sortFn = (i1: T, i2: T) => transform
            ? getComparator(order, orderBy)(transform(i1), transform(i2))
            : getComparator(order, orderBy)(i1, i2);
        return [...items.sort(sortFn)];
    }, [order, orderBy, items]);

    return sortedItems;
};
