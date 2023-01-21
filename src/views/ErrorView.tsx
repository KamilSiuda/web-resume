import React from 'react';
import { Box, Typography } from '@mui/material';

export const ErrorView: React.FC<{title: string; message: string}> = ({ title, message }) => {
    return <Box paddingTop={4} textAlign='center'>
        <Typography variant='h5' fontWeight='bold'>{title}</Typography>
        <Typography>{message}</Typography>
    </Box>;
};
