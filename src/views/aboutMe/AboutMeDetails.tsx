import React from 'react';
import { Chip, Grid, Link, Skeleton, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { BioCollection } from 'models/storage/BioCollection';
import { SkeletonableProps, SkeletonWrapper } from 'components/SkeletonWrapper';

type AboutMeDetailsProps = Partial<Omit<BioCollection, 'name' | 'about' | 'avatar'>> & {loading?: boolean };

export const AboutMeDetails: React.FC<AboutMeDetailsProps> = ({
    loading, email, github, skills, profficiency
}) => {
    const linkSkeletonProps: SkeletonableProps['skeleton'] = {
        variant: 'text', width: 200, height: 30
    };
    return <Stack justifyContent='center' spacing={3}>
        <Stack spacing={1} justifyContent='center' alignItems={{ xs: 'flex-start', lg: 'center' }}>
            <Typography>Contact</Typography>
            <SkeletonWrapper skeleton={linkSkeletonProps} loading={loading}>
                <Typography variant='body2' display='flex' alignItems='center'>
                    <EmailIcon color='secondary' sx={{ marginRight: 1 }} /><Link component='a' color='secondary' href={`mailto:${email}`}>{email}</Link>
                </Typography>
            </SkeletonWrapper>
            <SkeletonWrapper skeleton={linkSkeletonProps} loading={loading}>
                <Typography variant='body2' display='flex' alignItems='center'>
                    <GitHubIcon color='secondary' sx={{ marginRight: 1 }} /><Link component='a'color='secondary' href={github}>github repository</Link>
                </Typography>
            </SkeletonWrapper>
        </Stack>
        <Stack spacing={1} justifyContent='center' alignItems={{ xs: 'flex-start', lg: 'center' }}>
            <Typography>Crucial skills</Typography>
            <Grid container spacing={1} justifyContent={{ xs: 'flex-start', lg: 'center' }}>
                {loading && Array(5, 1).map((e, i) => <Grid item key={i}><Skeleton variant='text' width={60} height={38} /></Grid>)}
                {skills?.map(skill => (
                    <Grid item key={skill}><Chip label={skill} variant='outlined' /></Grid>
                ))}
            </Grid>
        </Stack>
        <Stack spacing={1} justifyContent='center' alignItems={{ xs: 'flex-start', lg: 'center' }}>
            <Typography>I&apos;m also familiar with</Typography>
            <Grid container spacing={1} justifyContent={{ xs: 'flex-start', lg: 'center' }}>
                {loading && Array(5, 1).map((e, i) => <Grid item key={i}><Skeleton variant='text' width={60} height={38} /></Grid>)}
                {profficiency?.map(profficiency => (
                    <Grid item key={profficiency}><Chip label={profficiency} variant='outlined' /></Grid>
                ))}
            </Grid>
        </Stack>
    </Stack>;
};
