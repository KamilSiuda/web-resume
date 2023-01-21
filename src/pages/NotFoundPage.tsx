import React from 'react';
import { Box, Typography } from '@mui/material';
import { PageWrapper } from './Page';
import { SiteNavigation } from 'routing/SiteNavigation';
import { withHelmet } from 'components/Helmet';

const NotFoundPageContent = () => {
    return <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' sx={{ height: '100%', marginTop: -10 }}>
        <Typography variant='h2' fontWeight='bold'>404</Typography>
        <Typography>The page you are looking for does not exist.</Typography>
    </Box>;
};

export const NotFoundPage = withHelmet(SiteNavigation.notFound.name)(PageWrapper(NotFoundPageContent));
