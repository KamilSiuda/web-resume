import React from 'react';
import { Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import { PageWrapper } from './Page';
import { useBio } from 'hooks/documents/useBio';
import { useAboutMe } from 'hooks/collections/useAboutMe';
import { AboutMeContent } from 'views/aboutMe/AboutMeContent';
import { AboutMeDetails } from 'views/aboutMe/AboutMeDetails';
import { SiteNavigation } from 'routing/SiteNavigation';
import { withHelmet } from 'components/Helmet';
import { AboutMeAvatar } from 'views/aboutMe/AboutMeAvatar';
import { AboutMeHeader } from 'views/aboutMe/AboutMeHeader';

const AboutMePageContent = () => {
    const { data: bio, isLoading: isBioLoading } = useBio();
    const { data: about, isLoading: isAboutLoading } = useAboutMe();

    const theme = useTheme();
    const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

    return <Grid container spacing={8} flexDirection={isLgDown ? 'column-reverse' : 'row'}>
        <Grid item xs={12} lg={8}>
            {!isLgDown && <AboutMeHeader name={bio?.name} about={bio?.about} loading={isBioLoading} />}
            <AboutMeContent paragraphs={about || []} loading={isAboutLoading} />
        </Grid>
        <Grid item xs={12} lg={4}>
            <Stack spacing={2} justifyContent='center' alignItems={{ xs: 'flex-start', lg: 'center' }}>
                <AboutMeAvatar avatar={bio?.avatar} />
                {isLgDown && <AboutMeHeader noBackground name={bio?.name} about={bio?.about} loading={isBioLoading} />}
                <AboutMeDetails loading={isBioLoading} {...(bio || {})} />
            </Stack>
        </Grid>
    </Grid>;
};

export const AboutMePage = withHelmet(SiteNavigation.about.name)(PageWrapper(AboutMePageContent));
