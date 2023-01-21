import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SkeletonWrapper } from 'components/SkeletonWrapper';
import { BioCollection } from 'models/storage/BioCollection';

type AboutMeHeaderProps = Partial<Pick<BioCollection, 'name' | 'about'>> & { noBackground?: boolean; loading?: boolean };
export const AboutMeHeader: React.FC<AboutMeHeaderProps> = ({ name, about, noBackground, loading }) => {
    const theme = useTheme();
    const isLgDown = useMediaQuery(theme.breakpoints.down('md'));

    return <><Typography variant='h4' fontWeight='bold' paddingBottom={4}>
        <SkeletonWrapper loading={loading} skeleton={{
            height: 100,
            width: 400,
            variant: 'text',
            sx: { ...(isLgDown ? { margin: '0 auto' } : {}) }
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
                    {!isLgDown ? <>👋</> : ''}
                  Hi, my name is {name}
                </Box>
            </Box>
        </SkeletonWrapper>
    </Typography>
    <SkeletonWrapper loading={loading} skeleton={{
        height: 60, width: 600, variant: 'text'
    }}>
        <Typography variant='h6' paddingBottom={2}>
            {about}
        </Typography>
    </SkeletonWrapper></>;
};
