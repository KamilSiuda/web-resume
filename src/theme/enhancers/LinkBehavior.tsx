import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to']}>((props, ref) => {
    const { href, ...rest } = props;
    return <RouterLink ref={ref} to={href} {...rest} />;
});
