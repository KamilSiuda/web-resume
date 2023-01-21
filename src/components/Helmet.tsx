import React from 'react';
import { Helmet } from 'react-helmet-async';

export const withHelmet = (title: string) => <TProps extends {}>(WrappedComponent: React.ComponentType<TProps>) => {
    return function (props: TProps) {
        return <>
            <Helmet><title>{title}</title></Helmet>
            <WrappedComponent {...props} />
        </>;
    };
};
