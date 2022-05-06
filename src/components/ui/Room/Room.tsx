import React from 'react'
import { Box, Button, Center, Container, Flex, Heading, HStack, Icon, Image, Skeleton, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack, Wrap } from '@chakra-ui/react'
import { MdBedroomChild, MdKingBed, MdSingleBed } from "react-icons/md"
import { GiBunkBeds } from "react-icons/gi"
import { RoomType } from '../../../utils/types'



function Bed({ forChildren, doubleBed }: { forChildren: boolean, doubleBed: boolean }) {
    if (forChildren && !doubleBed) return <Text>1x Kinderbett<Icon as={MdBedroomChild} /></Text>
    if (forChildren && doubleBed) return <Text>1x Doppel-Kinderbett<Icon as={GiBunkBeds} /></Text>
    if (!forChildren && doubleBed) return <Text>1x Doppelbett<Icon as={MdKingBed} /></Text>
    return <Text >1x Einzelbett<Icon as={MdSingleBed} /></Text>

}

function Room({ room, onSelect, onlyView = false }: { room: RoomType, onSelect: (arg0: RoomType) => void, onlyView?: boolean }) {
    const { name, beds, price, amount } = room
    return (
        <Box m="4" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' key={room.name}>
            <Image src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" />
            <Flex p="6" direction="column">
                <Box flex="1">
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        isTruncated
                    >
                        {name}
                    </Box>
                    <Box>
                        {price}€
                        <Box as='span' color='gray.600' fontSize='sm'>
                            /pro Nacht
                        </Box>
                    </Box>
                    <Wrap h="32">
                        {room.beds.map(({ forChildren, doubleBed }) => <Bed doubleBed={doubleBed} forChildren={forChildren} />)}
                    </Wrap>
                </Box>
                {!onlyView &&
                    <Box>
                        <Button w="full" colorScheme="purple" onClick={() => onSelect(room)}>Jetzt Buchen!</Button>
                        <Text color="gray.600" textAlign="center">Nur noch  {amount} Zimmer verfügbar!</Text>
                    </Box>}
            </Flex>
        </Box>
    )
}

export default Room