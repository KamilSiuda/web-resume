import { ErrorMessage } from '@hookform/error-message';
import { FormHelperText } from '@mui/material';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

type FormErrorMessageProps = {
    field: string;
    errors: FieldErrors;
}
export const FormErrorMessage = ({ field, errors }: FormErrorMessageProps) => {
    return <ErrorMessage name={field} errors={errors} render={({ message }) => <FormHelperText error>{message}</FormHelperText>} />;
};
