import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VStack, Flex, Spacer, Tag, Text, Progress, Box, Image } from '@chakra-ui/react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';
import { Post } from '../../types/Post';
import postsAPI from '../../api/postsAPI';

type Vote = {
  postId: string;
  optionId: string;
};

const FullPost: React.FC<Post> = ({
  username,
  title,
  content,
  tag,
  date,
  type,
  poll,
  imageUrl,
}) => {
  const [voted, setVoted] = useState(false);
  const queryClient = useQueryClient();

  const distance = formatDistanceToNow(parseISO(date));

  const mutation = useMutation(
    (vote: Vote) => {
      return postsAPI.post('votes', { json: vote }).json();
    },
    { onSuccess: () => queryClient.invalidateQueries('todos') },
  );

  const handleVote = (vote: Vote) => {
    mutation.mutate(vote);
    setVoted(true);
  };

  return (
    <VStack p="5" borderWidth="1px" borderRadius="lg" spacing="2" align="stretch">
      <Flex align="baseline">
        {tag && <Tag colorScheme="blue">{`#${tag}`}</Tag>}
        <Text
          ml={tag ? 2 : 0}
          fontSize="sm"
          fontWeight="bold"
          color="blue.800"
          maxW="150px"
          isTruncated
        >
          {`u/${username}`}
        </Text>
        <Spacer />
        <Text color="gray.500" fontSize="sm">{`Posted ${distance} ago`}</Text>
      </Flex>
      <Text fontSize="xl" fontWeight="semibold">
        {title}
      </Text>
      {type === 'text' && typeof content !== 'undefined' && (
        <Text noOfLines={[3, null, 5]}>{content}</Text>
      )}
      {type === 'poll' && typeof poll !== 'undefined' && (
        <VStack spacing="2" align="stretch">
          {poll.pollOptions.map((option) => (
            <Box
              p="5"
              borderWidth="1px"
              borderRadius="lg"
              transitionDuration="200ms"
              cursor={voted ? 'default' : 'pointer'}
              _hover={voted ? undefined : { backgroundColor: 'gray.200' }}
              key={option.id}
              onClick={voted ? undefined : () => handleVote({ postId: date, optionId: option.id })}
            >
              <Flex>
                <Text fontSize="md" fontWeight="semibold">
                  {option.option}
                </Text>
                <Spacer />
                {voted && (
                  <Text fontSize="md" color="gray.500">
                    {`${option.votes} votes`}
                  </Text>
                )}
              </Flex>
              {voted && (
                <Progress mt="2" value={Math.floor((option.votes / poll.totalVotes) * 100)} />
              )}
            </Box>
          ))}
        </VStack>
      )}
      {type === 'image' && typeof imageUrl !== 'undefined' && (
        <Box>
          <Image mx="auto" borderRadius="lg" src={imageUrl} maxH="512px" />
        </Box>
      )}
    </VStack>
  );
};

FullPost.defaultProps = {
  tag: '',
  content: '',
  imageUrl: '',
  poll: {
    pollOptions: [],
    totalVotes: 0,
  },
};

FullPost.propTypes = {
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  tag: PropTypes.string,
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'poll', 'image'] as const).isRequired,
  poll: PropTypes.shape({
    pollOptions: PropTypes.arrayOf(
      PropTypes.shape({
        option: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    totalVotes: PropTypes.number.isRequired,
  }),
  imageUrl: PropTypes.string,
};

export default FullPost;
