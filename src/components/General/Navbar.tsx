import React from 'react';
import { Flex, Box, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link, useMatch } from 'react-router-dom';

const Navbar = () => {
  const match = useMatch({ path: '/' });
  return (
    <Flex my="25px" px={['2.5%', null, '12.5%', null, '30%']}>
      <Box p="2">
        <Link to="/">
          <Heading size="xl">Leddit</Heading>
        </Link>
      </Box>
      {match && (
        <>
          <Spacer />
          <Link to="/new">
            <Button colorScheme="blue">Post</Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
