/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { FastField, FieldProps } from 'formik';
import React from 'react';

const TextPost: React.FC = () => {
  return (
    <FastField name="content">
      {({ field }: FieldProps) => (
        <FormControl id="content" isRequired>
          <FormLabel>Text</FormLabel>
          <Textarea {...field} placeholder="Text" />
        </FormControl>
      )}
    </FastField>
  );
};

export default TextPost;
