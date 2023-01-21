import React from 'react';
import { Avatar } from '@mui/material';
import { SkeletonWrapper } from 'components/SkeletonWrapper';
import { useAvatar } from 'hooks/storage/useAvatar';

const avatarSize = 160;
export const AboutMeAvatar: React.FC<{avatar?: string}> = ({ avatar }) => {
    const { data: avatarLink, isLoading: isAvatarLoading, isError: isAvatarError } = useAvatar(avatar || '');

    return <SkeletonWrapper loading={isAvatarLoading || isAvatarError} skeleton={{
        variant: 'circular', width: avatarSize, height: avatarSize, sx: { alignSelf: 'center' }
    }}>
        <Avatar src={avatarLink} sx={{
            width: avatarSize, height: avatarSize, alignSelf: 'center'
        }} />
    </SkeletonWrapper>;
};
