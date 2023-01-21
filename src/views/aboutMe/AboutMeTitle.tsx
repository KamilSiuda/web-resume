import React from 'react';
import { Box, Typography } from '@mui/material';
import { SkeletonWrapper } from 'components/SkeletonWrapper';

export const AboutMeTitle: React.FC<{name?: string | undefined, noBackground?: boolean, loading?: boolean}> = ({ name, noBackground, loading }) => {
    return <Typography variant='h4' fontWeight='bold' paddingBottom={4}>
        <SkeletonWrapper loading={loading} skeleton={{
            height: 100, width: 400, variant: 'text'
        }}>
            <Box sx={theme => ({
                background: !noBackground ? theme.palette.secondary.main : 'inherit',
                padding: 1,
                borderRadius: `${theme.shape.borderRadius}px`,
                width: 'fit-content',
                textAlign: 'center',
                lg: { textAlign: 'left' }
            })}>
                <Box component='span' >
    👋          Hi, my name is {name}
                </Box>
            </Box>
        </SkeletonWrapper>
    </Typography>;
};
