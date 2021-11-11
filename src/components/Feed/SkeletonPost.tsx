import React from 'react';
import { Box, Flex, Spacer, Tag, Text, Skeleton } from '@chakra-ui/react';

const SkeletonPost = () => {
  return (
    <Box p="5" borderWidth="1px" borderRadius="lg">
      <Flex align="baseline" mt={2}>
        <Skeleton>
          <Tag>Lorem</Tag>
        </Skeleton>
        <Skeleton ml={2}>
          <Text fontSize="sm" fontWeight="bold">
            LoremIpsum
          </Text>
        </Skeleton>
        <Spacer />
        <Skeleton>
          <Text fontSize="sm">Posted sometime ago</Text>
        </Skeleton>
      </Flex>
      <Skeleton mt={2}>
        <Text fontSize="xl" fontWeight="semibold">
          Lorem ipsum dolor
        </Text>
      </Skeleton>
      <Skeleton mt={2}>
        <Text noOfLines={[3, null, 5]}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, aliquid ipsam commodi
          atque minima facere fugiat nostrum! Adipisci dolorem delectus eum harum quibusdam iusto,
          minima, earum deserunt fugiat illo eius. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Earum, minus eveniet vitae consequuntur veniam quam voluptatem
          reprehenderit sit perspiciatis exercitationem recusandae praesentium! Illum numquam earum
          alias dolor architecto voluptas laudantium.
        </Text>
      </Skeleton>
    </Box>
  );
};

export default SkeletonPost;
