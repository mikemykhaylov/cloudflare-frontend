/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import { FormControl, FormLabel, Center, Heading } from '@chakra-ui/react';
import { FastField, useFormikContext } from 'formik';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { FormValues } from '../../types/Post';

const ImagePost = () => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const onDrop: Exclude<DropzoneOptions['onDrop'], undefined> = useCallback((acceptedFiles) => {
    setFieldValue('image', acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });
  return (
    <FastField name="image">
      {() => (
        <FormControl id="image" isRequired>
          <FormLabel>Upload image</FormLabel>
          <Center
            borderRadius="lg"
            borderWidth="medium"
            borderStyle="dashed"
            borderColor="gray.300"
            width="100%"
            height="300px"
            bgColor="gray.100"
            cursor="pointer"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Heading size="md" color="gray.500">
              {values.image.name !== 'null' ? 'Accepted' : 'Waiting'}
            </Heading>
          </Center>
        </FormControl>
      )}
    </FastField>
  );
};

export default ImagePost;
