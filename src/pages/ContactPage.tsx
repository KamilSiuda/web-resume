import React from 'react';
import { Alert, FormControl, Grid, TextField, Typography } from '@mui/material';
import { PageWrapper } from './Page';
import { FormErrorMessage } from 'components/FormErrorMessage';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useBio } from 'hooks/documents/useBio';
import { CustomLink } from 'components/CustomLink';
import { useContacForm } from 'hooks/useContactForm';
import { SiteNavigation } from 'routing/SiteNavigation';
import { withHelmet } from 'components/Helmet';

const ContactPageContent = () => {
    const {
        form, inputs, isSaveError, isSavePending, submit
    } = useContacForm();
    const { formState: { errors } } = form;
    const { enqueueSnackbar } = useSnackbar();
    const { data: aboutMe, isLoading: isAboutMeLoading, isError: isAboutMeError } = useBio();

    const handleSubmit = async (...params: Parameters<typeof submit>) => {
        const { success, error } = await submit(...params);
        if (success) {
            enqueueSnackbar('Message sent! Thank you.', { variant: 'success' });
        } else {
            enqueueSnackbar(error || 'Message failed to be sent. Please try again later.', { variant: 'error' });
        };
    };

    return <>
        <Typography variant='h4' textAlign='center' fontWeight='700'>👋 Feel free to contact me!</Typography>
        <Typography variant='body1' textAlign='center' paddingTop={2}>
            You can contact me via contact form or
            <CustomLink disabled={isAboutMeLoading || isAboutMeError} href={`mailto:${aboutMe?.email}`} sx={{ textDecoration: 'underline' }}> send me an email </CustomLink>
            directly.
        </Typography>
        <Grid container component='form' spacing={2} sx={{ paddingTop: 6, width: '100%' }} onSubmit={handleSubmit}>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(errors.name)}>
                    <TextField {...inputs.name} label='Your email' placeholder='mail@example.com' InputLabelProps={{ shrink: true }} />
                    <FormErrorMessage field='name' errors={errors} />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(errors.subject)}>
                    <TextField {...inputs.subject} label='Subject' placeholder='What is the subject?' InputLabelProps={{ shrink: true }} />
                    <FormErrorMessage field='subject' errors={errors} />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(errors.message)}>
                    <TextField
                        {...inputs.message}
                        multiline
                        rows={5}
                        label='Message'
                        placeholder='Message...'
                        InputLabelProps={{ shrink: true }} />
                    <FormErrorMessage field='message' errors={errors} />
                </FormControl>
            </Grid>
            {isSaveError &&
            <Grid item xs={12}>
                <Alert severity='error' title='Cannot send message'>An error occurred while sending the form. Please check your internet connection or contact administrator.</Alert>
            </Grid>
            }
            <Grid item xs={12}>
                <LoadingButton
                    variant='contained'
                    size='large'
                    type='submit'
                    endIcon={<CallMadeIcon />}
                    loading={isSavePending}
                    sx={theme => ({
                        [theme.breakpoints.down('md')]: { width: '100%' },
                        [theme.breakpoints.up('md')]: { minWidth: 300 }
                    })}
                >Send</LoadingButton>
            </Grid>
        </Grid>
    </>;
};

export const ContactPage = withHelmet(SiteNavigation.contact.name)(PageWrapper(ContactPageContent));
