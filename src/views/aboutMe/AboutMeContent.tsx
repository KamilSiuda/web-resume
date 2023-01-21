import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { AboutCollection } from 'models/storage/AboutCollection';
import { FirestoreDocument } from 'models/storage/FirestoreDocument';

const AboutMeParagraph: React.FC<AboutCollection> = ({ title, content }) => {
    return <>
        <Typography fontWeight='bold' paddingTop={4}>{title}</Typography>
        <Typography textAlign='justify' whiteSpace='pre-wrap'>{content}</Typography>
    </>;
};

const AboutMeParagraphSkeleton = () => {
    return <>
        <Skeleton variant='text' width={60} height={40} sx={{ paddingTop: 4 }} />
        <Skeleton variant='rectangular' width='90%' height={300} sx={{ marginBottom: 4 }} />
    </>;
};

export const AboutMeContent: React.FC<{paragraphs: Array<AboutCollection & FirestoreDocument>} & { loading?: boolean }> = ({ paragraphs, loading }) => {
    const paragraphsSorted = paragraphs ? [...paragraphs].sort((a1, a2) => a1.order - a2.order) : [];

    if (loading) {
        return <>{Array(3, 1).map((e, i) => (<AboutMeParagraphSkeleton key={i} />))}</>;
    }

    return <>{paragraphsSorted?.map((about) => (<AboutMeParagraph key={about.fireId} {...about} />))}</>;
};
