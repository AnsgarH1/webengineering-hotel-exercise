import { Box, Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import Footer from '../sections/Footer/Footer'
import Header from '../sections/Header/Header'

function Layout({ children }: { children: ReactNode }) {
    return (
        <Flex justify="space-between" direction="column" h="100vh" bgColor="gray.50">
            <Header />

            <Box  flex="1">
                {children}
            </Box>

            <Footer />
        </Flex>
    )
}

export default Layout