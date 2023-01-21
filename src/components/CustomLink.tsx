import React from 'react';
import { Link, LinkProps } from '@mui/material';

export const CustomLink: React.FC<React.PropsWithChildren<LinkProps> & {disabled?: boolean}> = ({ disabled, children, ...props }) => {
    return <Link
        {...props}
        component='a'
        href={disabled ? undefined : props.href}
        sx={theme => ({ ...(disabled ? { color: theme.palette.action.disabled } : {}) })}>
        {children}
    </Link>;
};
