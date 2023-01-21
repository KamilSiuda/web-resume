import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

type NumericChipProps = {
    value: number;
    title: string;
    endAdornment?: string;
    animate?: boolean;
};

export const NumericChip: React.FC<NumericChipProps> = React.forwardRef<unknown, NumericChipProps>(({
    title, value, endAdornment, animate = true, ...restProps
}, ref) => {
    const [displayedValue, setDisplayedValue] = useState(animate ? 0 : value);

    const animateValue = (from: number, to: number) => {
        let current = from;
        const interval = setInterval(() => {
            current = Math.min(current + Math.ceil(to / 10), to);
            setDisplayedValue(current);
            if (current === to) {
                clearInterval(interval);
            }
        }, 100);
        return interval;
    };

    useEffect(() => {
        if (!animate) {
            setDisplayedValue(value);
        }
        const interval = animateValue(0, value);
        return () => {
            clearInterval(interval);
        };
    }, [value, animate]);

    return <Stack {...restProps} ref={ref} alignItems='center' spacing={1} sx={{ paddingTop: 4 }}>
        <Box sx={theme => ({
            display: 'flex', justifyContent: 'center', alignItems: 'center', background: theme.palette.primary.main, color: theme.palette.primary.contrastText, width: 64, height: 64, borderRadius: '50%'
        })}>
            <Typography variant='h6' fontWeight='bold'>{displayedValue}{endAdornment}</Typography>
        </Box>
        <Typography fontWeight='bold' textAlign='center'>{title}</Typography>
    </Stack>;
});
