import { Box, Center, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../ui/Auth/Auth'

function Header() {
  return (
    <HStack justify="space-between" px="4" bgColor="blue.800" minH="24">
      <Box></Box>
      <Center h="full">
        <Link to="/">
          <Heading color="white">Hotel Buchungen</Heading>
        </Link>
      </Center>
      <Box justifySelf="end">
        <Auth />
      </Box>

    </HStack>
  )
}

export default Header