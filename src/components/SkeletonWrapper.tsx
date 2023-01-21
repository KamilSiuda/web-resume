import React from 'react';
import { Skeleton, SxProps, Theme } from '@mui/material';

export type SkeletonableProps = {
    loading?: boolean;
    skeleton?: {
        variant: 'rectangular' | 'circular' | 'text';
        width: number;
        height: number;
        sx?: SxProps<Theme>;
    };
}

export const SkeletonWrapperHoc = <TProps extends SkeletonableProps & {}, >(Wrapped: React.ComponentType<Omit<TProps, keyof SkeletonableProps>>) => {
    return function (props: TProps) {
        const { loading, skeleton } = props;
        if (loading) {
            return <Skeleton
                variant={skeleton?.variant}
                height={skeleton?.height}
                width={skeleton?.width}
                sx={{ maxWidth: '90%', ...(skeleton?.sx ? skeleton.sx : {}) }}
            />;
        }
        return <Wrapped {...(props)} />;
    };
};

export const SkeletonWrapper: React.FC<React.PropsWithChildren<SkeletonableProps>> = ({ loading, skeleton, children }) => {
    if (loading) {
        return <Skeleton
            variant={skeleton?.variant}
            height={skeleton?.height}
            width={skeleton?.width}
            sx={{ maxWidth: '90%', ...(skeleton?.sx || {}) }}
        />;
    }

    return <>{children}</>;
};
