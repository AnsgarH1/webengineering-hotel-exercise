import React from 'react'
import { Box, Center, Container, Flex, Heading, Icon, Image, Skeleton, Stat, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import { MdBedroomChild, MdKingBed, MdSingleBed } from "react-icons/md"
import { GiBunkBeds } from "react-icons/gi"

import { RoomType } from '../../types'


function Bed({ forChildren, doubleBed }: { forChildren: boolean, doubleBed: boolean }) {
    if (forChildren && !doubleBed) return <Text align="right">1x Kinderbett<Icon as={MdBedroomChild} /></Text>
    if (forChildren && doubleBed) return <Text align="right">1x Doppel-Kinderbett<Icon as={GiBunkBeds} /></Text>
    if (!forChildren && doubleBed) return <Text align="right">1x Doppelbett<Icon as={MdKingBed} /></Text>
    return <Text align="right">1x Einzelbett<Icon as={MdSingleBed} /></Text>

}

function Room({ room, image }: { room: RoomType, image: string | null }) {
    const { name, beds, price, amount } = room
    return (
        <Box w="500px" borderWidth='1px' borderRadius='lg' py="4" px="4px" my="6px" key={room.name}>
            <Box>
                <Heading size="md">{name}</Heading>
            </Box>
            <Flex>
                {image ?
                    <Image w="250px" h="150px" mt="4px" src={image} /> :
                    <Skeleton w="250px" h="150px" bgColor="lightgrey" mt="4px" />}
                <Flex w="400px" direction="column" justify="space-between" >
                    <Heading textAlign="center" size="xs">{price}€ pro Nacht</Heading>
                    <VStack>
                        {room.beds.map(({ forChildren, doubleBed }) => <Bed doubleBed={doubleBed} forChildren={forChildren} />)}
                    </VStack>
                    <Text textAlign="center">Nur noch  {amount} Zimmer verfügbar!</Text>

                </Flex>
            </Flex>

        </Box >
    )
}

export default Room