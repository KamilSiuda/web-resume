import React from 'react';
import { Typography } from '@mui/material';
import { SkeletonWrapper } from 'components/SkeletonWrapper';
import { BioCollection } from 'models/storage/BioCollection';

type AboutMeHeaderProps = Partial<Pick<BioCollection, 'about'>> & { loading?: boolean };
export const AboutMeSubHeader: React.FC<AboutMeHeaderProps> = ({ about, loading }) => {
    return <SkeletonWrapper loading={loading} skeleton={{
        height: 60, width: 600, variant: 'text'
    }}>
        <Typography variant='h6' paddingBottom={2}>
            {about}
        </Typography>
    </SkeletonWrapper>;
};
