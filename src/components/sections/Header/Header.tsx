import { Box, Center, Heading, HStack } from '@chakra-ui/react'
import React from 'react'
import Auth from '../../ui/Auth/Auth'

function Header() {
  return (
    <HStack justify="space-between" px="4" bgColor="blue.500" h="24">
      <Box></Box>
      <Center h="full">
        <Heading color="white">Hotel Buchungen</Heading>
      </Center>
      <Box justifySelf="end">
        <Auth />
      </Box>

    </HStack>
  )
}

export default Header