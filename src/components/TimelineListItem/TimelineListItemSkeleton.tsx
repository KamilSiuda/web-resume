import React from 'react';
import { Grid, Skeleton, Stack } from '@mui/material';
import { TimelineListItemBase } from './TimelineListItemBase';

export const TimelineListItemSkeleton = () => {
    return <TimelineListItemBase
        avatar={<Skeleton variant='circular' height='50px' width='50px' />}
        dates={<Skeleton variant='text' height={40} width='80%' />}
        tags={<Grid container spacing={1} paddingBottom={2} alignItems='center' justifyContent='center' sx={{ width: '100%' }}>
            {Array(5).fill(5).map((el, i) => <Grid item key={i}><Skeleton variant='rectangular' height={34} width={80} /></Grid>)}
        </Grid>}
        header={ <Stack direction='column' spacing={2}>
            <Skeleton variant='text' width={300} height={50} />
            <Skeleton variant='text' width={150} height={30} />
        </Stack>}
        content={<Skeleton variant='rectangular' height={200} width='90%' />}
    />;
};
