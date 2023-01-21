import { Avatar, CardHeader, Skeleton } from '@mui/material';
import React from 'react';

export interface ArticleBadgeProps {
    image: string;
    author: string;
    date: string;
};

export const ArticleBadge: React.FC<ArticleBadgeProps> = ({ image, author, date }) => {
    return <CardHeader avatar={<Avatar src={image} sx={{ width: 56, height: 56 }} />} title={author} subheader={date} titleTypographyProps={{ fontWeight: '600' }} />;
};

export const ArticleBadgeSkeleton = () => {
    return <CardHeader
        avatar={<Skeleton width={56} height={56} variant='circular' />}
        title={<Skeleton variant='text' width={100} />}
        subheader={<Skeleton variant='text' width={70} />} />;
};
