import React from 'react';
import { Chip, Grid, Link, Skeleton, Stack, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { BioCollection } from 'models/storage/BioCollection';
import { SkeletonableProps, SkeletonWrapper } from 'components/SkeletonWrapper';
import { useSkills } from 'hooks/collections/useSkills';
import { useProfficiencies } from 'hooks/collections/useProfficiencies';
import { useSort } from 'hooks/useSort';

type AboutMeDetailsProps = Partial<Omit<BioCollection, 'name' | 'about' | 'avatar'>> & {loading?: boolean };

export const AboutMeDetails: React.FC<AboutMeDetailsProps> = ({ loading, email, github }) => {
    const { data: skills, isLoading: skillsLoading, isError: skillsError } = useSkills();
    const { data: profficiency, isLoading: profficiencyLoading, isError: profficiencyError } = useProfficiencies();
    const sortedSkills = useSort(skills || [], { order: 'asc', orderBy: 'priority' });
    const sortedProfficiency = useSort(profficiency || [], { order: 'asc', orderBy: 'priority' });

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
                {(skillsLoading || skillsError) && Array(5, 1).map((e, i) => <Grid item key={i}><Skeleton variant='text' width={60} height={38} /></Grid>)}
                {sortedSkills?.map(({ name: skill }) => (
                    <Grid item key={skill}><Chip label={skill} variant='outlined' /></Grid>
                ))}
            </Grid>
        </Stack>
        <Stack spacing={1} justifyContent='center' alignItems={{ xs: 'flex-start', lg: 'center' }}>
            <Typography>I&apos;m also familiar with</Typography>
            <Grid container spacing={1} justifyContent={{ xs: 'flex-start', lg: 'center' }}>
                {(profficiencyLoading || profficiencyError) && Array(5, 1).map((e, i) => <Grid item key={i}><Skeleton variant='text' width={60} height={38} /></Grid>)}
                {sortedProfficiency?.map(({ name: profficiency }) => (
                    <Grid item key={profficiency}><Chip label={profficiency} variant='outlined' /></Grid>
                ))}
            </Grid>
        </Stack>
    </Stack>;
};
