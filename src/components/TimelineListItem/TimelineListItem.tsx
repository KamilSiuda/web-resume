import React from 'react';
import { Avatar, Chip, Grid, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import { TimelineEntry } from 'models/TimelineEntry';
import { useAvatar } from 'hooks/storage/useAvatar';
import { TimelineListItemBase } from './TimelineListItemBase';
import { Dayjs } from 'dayjs';

const timlineDateFormat = 'MMMM YYYY';

type AvatarProps = {
    isLoading?: boolean;
    isError?: boolean;
    avatar?: string,
    alt?: string;
};

const TimelineAvatar: React.FC<AvatarProps> = ({ isLoading, isError, avatar, alt }) => {
    return <ListItemAvatar sx={{ paddingBottom: 1 }}>
        {(isLoading || isError) && <Skeleton variant='circular' height='50px' width='50px' />}
        {!isLoading && !isError && <Avatar alt={alt} src={avatar} imgProps={{
            sx: {
                height: 'auto', width: 'auto', maxWidth: '130px', maxHeight: '50px'
            }
        }} sx={{
            width: '100%', height: '50px', borderRadius: 0
        }} />}
    </ListItemAvatar>;
};

const TimelineDates: React.FC<{from: Dayjs; to?: Dayjs}> = ({ from, to }) => {
    return <ListItemText
        primary={`${from.format(timlineDateFormat)} - ${to ? to.format(timlineDateFormat) : 'present'}`}
        primaryTypographyProps={{
            textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold'
        }}
        secondaryTypographyProps={{ textAlign: 'center', fontWeight: 'bold' }}
        sx={{ flex: 0, '.MuiListItemText-primary': { paddingBottom: 1 } }}
    />;
};

const TimelineTags: React.FC<{tags: Array<string>}> = ({ tags }) => {
    return <Grid container spacing={1} paddingBottom={2} alignItems='center' justifyContent='center'>
        {tags.map(s => <Grid item key={s}><Chip label={s} size='medium' variant='outlined' /></Grid>)}
    </Grid>;
};

const TimelineHeader: React.FC<{title: string, subtitle: string}> = ({ title, subtitle }) => {
    return <ListItemText
        primary={title}
        secondary={subtitle}
        primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
    />;
};

const TimelineContent: React.FC<{content: string}> = ({ content }) => {
    return <ListItemText secondary={content} secondaryTypographyProps={{ whiteSpace: 'pre-wrap' }} />;
};

export const TimelineListItem: React.FC<TimelineEntry> = ({
    avatar, title: companyName, from, to, subtitle: role, description: roleDescription, tags: skills
}) => {
    const { data: avatarImage, isLoading: isAvatarLoading, isError: isAvatarError } = useAvatar(avatar || '');

    return <TimelineListItemBase
        avatar={<TimelineAvatar isLoading={isAvatarLoading} isError={isAvatarError} alt={companyName} avatar={avatarImage} />}
        dates={<TimelineDates from={from} to={to} />}
        tags={skills && <TimelineTags tags={skills} />}
        header={<TimelineHeader title={companyName} subtitle={role} />}
        content={<TimelineContent content={roleDescription} />}

    />;
};
