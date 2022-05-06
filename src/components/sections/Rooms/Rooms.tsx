import React from 'react'

import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import Room from '../../ui/Room/Room'

import { useRooms } from '../../../utils/hooks'
import { RoomType } from '../../../utils/types'




function Rooms({ rooms, setSelectedRoom, isLoading, errorMessage }: { rooms: RoomType[] | undefined, setSelectedRoom: (arg0: RoomType) => void, isLoading: boolean, errorMessage: string }) {



    return (
        <Box>
            <Heading mt="8" mb="4" size="md" textAlign="center">Verfügbare Zimmer:</Heading>
            {
                isLoading ? <Center><Spinner /></Center> :
                    <Flex wrap="wrap" justify="space-around"  >
                        {rooms ? rooms.map((r, index) => <Room room={r} onSelect={setSelectedRoom} />) : <Text>keine Zimmer geladen</Text>}
                    </Flex>
            }

            {errorMessage.length > 0 && <Text>{errorMessage}</Text>}
        </Box>)
}

export default Rooms