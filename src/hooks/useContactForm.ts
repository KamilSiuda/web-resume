import React from 'react';
import { useForm } from 'react-hook-form';
import { useWriteMessage } from 'hooks/documents/useWriteMessage';
import { MessagesCollection } from 'models/storage/MessagesCollection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { config } from 'config';
import dayjs from 'dayjs';
import { appStateActions } from 'store/appState.reducer';

type ContactForm = {
    name: string;
    subject: string;
    message: string;
}

export const useContacForm = () => {
    const dispatch = useDispatch();
    const contactFormSubmitionTimestampMS = useSelector((state: RootState) => state.appState.contactFormSubmitionTimestampMS);
    const { write: saveMessage, isLoading: isSavePending, isError: isSaveError } = useWriteMessage();
    const form = useForm<ContactForm>({ mode: 'onBlur' });
    const { register, handleSubmit, reset } = form;
    const nameInput = register('name', { required: 'Please provide your email address', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'Please provide valid email address' } });
    const subjectInput = register('subject', { required: 'Please provide message subject', minLength: { value: 3, message: 'Please provide meaningful subject' } });
    const messageInput = register('message', { required: 'Please enter message', minLength: { value: 10, message: 'Please enter more detailed description (at least 10 characters' } });

    const submit = async (e: React.BaseSyntheticEvent) => {
        let success = false;
        let error = '';
        await handleSubmit(async (form) => {
            const entity: MessagesCollection = {
                author: form.name,
                message: form.message,
                title: form.subject
            };

            if (Date.now() < contactFormSubmitionTimestampMS + config.contactFormSubmitionLimitMS) {
                error = `Sorry, you can't send two messages between such a short interval. You can send next message in 
                        ${dayjs.duration(contactFormSubmitionTimestampMS + config.contactFormSubmitionLimitMS - Date.now(), 'milliseconds').format('mm')} minutes`;
                return false;
            }

            success = await saveMessage(entity)
                .then(success => {
                    if (success) {
                        reset();
                        dispatch(appStateActions.contactFormSubmition());
                    }
                    error = 'Sending form to a server has failed.';
                    return success || false;
                })
                .catch(() => {
                    error = 'Sending form to a server has failed.';
                    return false;
                });
        }, (e) => {
            return false;
        })(e);
        return { success, error };
    };

    return {
        form,
        inputs: {
            name: nameInput,
            subject: subjectInput,
            message: messageInput,
        },
        isSavePending,
        isSaveError,
        submit,
    };
};
