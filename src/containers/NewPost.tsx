/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  TabList,
  Heading,
  Grid,
  Select,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { FastField, FieldProps, Form, Formik } from 'formik';
import ky from 'ky';
import React from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import postsAPI from '../api/postsAPI';
import ImagePost from '../components/NewPost/ImagePost';
import PollPost from '../components/NewPost/PollPost';
import TextPost from '../components/NewPost/TextPost';
import { FormValues, NewPost, PostTypes } from '../types/Post';

const CreateNewPost: React.FC<{ toast: ReturnType<typeof useToast> }> = ({ toast }) => {
  const navigate = useNavigate();

  const createPost = useMutation((newPost: NewPost) => {
    return postsAPI.post('posts', { json: newPost }).json();
  });

  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: '',
    username: '',
    pollOptions: [
      {
        option: '',
        id: uuidv4(),
      },
    ],
    image: new File([''], 'null'),
  };

  const postTypes: PostTypes[] = ['text', 'poll', 'image'];

  const handleFormSubmit = async (values: typeof initialValues) => {
    const newPost: NewPost = {
      type: postTypes[tabIndex],
      title: values.title,
      username: values.username,
    };
    if (values.tag) {
      newPost.tag = values.tag;
    }
    switch (newPost.type) {
      case 'text': {
        newPost.content = values.content;
        break;
      }
      case 'poll': {
        newPost.poll = {
          pollOptions: values.pollOptions.map((option) => ({ ...option, votes: 0 })),
          totalVotes: 0,
        };
        break;
      }
      case 'image': {
        const filename = `${uuidv4()}.${values.image.name.split('.').pop()}`;
        const { imageUrl }: { imageUrl: string } = await postsAPI
          .post('imageurl', { json: { filename } })
          .json();
        await ky.put(imageUrl, { body: values.image });
        newPost.imageUrl = `https://cloudflare-challenge.s3.us-west-2.amazonaws.com/images/${filename}`;
        break;
      }
      default: {
        break;
      }
    }
    createPost.mutate(newPost);
    toast({
      title: 'Post created.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ isSubmitting, values }) => (
        <Form>
          <VStack
            p="5"
            borderWidth="1px"
            borderRadius="lg"
            spacing={4}
            align="stretch"
            mx={['2.5%', null, '12.5%', null, '30%']}
          >
            <Heading size="lg">Create new post</Heading>
            <FastField name="username">
              {({ field }: FieldProps) => (
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} type="text" placeholder="Hi, your name is?" />
                </FormControl>
              )}
            </FastField>

            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <FastField name="title">
                {({ field }: FieldProps) => (
                  <FormControl id="title" isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input {...field} type="text" placeholder="An interesting title" />
                  </FormControl>
                )}
              </FastField>
              <FastField name="tag">
                {({ field }: FieldProps) => (
                  <FormControl id="tag">
                    <FormLabel>Tag</FormLabel>
                    <Select {...field} placeholder="Select tag (optional)">
                      <option value="tech">Tech</option>
                      <option value="nature">Nature</option>
                      <option value="people">People</option>
                    </Select>
                  </FormControl>
                )}
              </FastField>
            </Grid>

            <Tabs index={tabIndex} onChange={handleTabsChange} isLazy>
              <TabList>
                <Tab>Text</Tab>
                <Tab>Poll</Tab>
                <Tab>Image</Tab>
              </TabList>

              <TabPanels>
                <TabPanel p={0} pt={4}>
                  <TextPost />
                </TabPanel>
                <TabPanel p={0} pt={4}>
                  <PollPost values={values.pollOptions} />
                </TabPanel>
                <TabPanel p={0} pt={4}>
                  <ImagePost />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <ButtonGroup spacing="6">
              <Button colorScheme="blue" isLoading={isSubmitting} type="submit">
                Post
              </Button>
              <Link to="/">
                <Button colorScheme="red">Discard</Button>
              </Link>
            </ButtonGroup>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default CreateNewPost;
