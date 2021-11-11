/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { VStack, StackDivider, Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import FullPost from '../components/Feed/FullPost';
import SkeletonPost from '../components/Feed/SkeletonPost';
import postsAPI from '../api/postsAPI';
import { Post } from '../types/Post';

type GetPostsResult = {
  isLoading: boolean;
  data: Post[] | undefined;
};

const Feed: React.FC = () => {
  const { isLoading, data }: GetPostsResult = useQuery('todos', async () =>
    postsAPI.get('posts').json(),
  );

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        px={['2.5%', null, '12.5%', null, '30%']}
      >
        {isLoading ? <SkeletonPost /> : data!.map((post) => <FullPost key={post.date} {...post} />)}
      </VStack>
      <Box h="200px" />
    </>
  );
};

export default Feed;
