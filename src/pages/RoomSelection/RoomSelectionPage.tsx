import React, { useEffect, useState } from 'react'

import { Box, Button, Center, Divider, Flex, Heading, HStack, Spinner, Text } from '@chakra-ui/react'
import Room from '../../components/ui/Room/Room'

import DateInput from '../../components/ui/DateInput/DateInput'
import PersonInput from '../../components/ui/PersonInput/PersonInput'
import { useBookingContext } from '../../utils/context/BookingContext'
import { useNavigate } from 'react-router-dom'




function RoomSelectionPage() {
    const { rooms, loadRooms, isLoading, errorMessage, setInputParams, setSelectedRoom } = useBookingContext()

    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [duration, setDuration] = useState(2)

    useEffect(() => {
        setInputParams({ adults, children, duration })
    }, [adults, children, duration])

    const navigate = useNavigate()


    return (
        <Box>
            <HStack justifyContent="space-around" py="4" m="1rem" >
                <DateInput duration={duration} setDuration={(newDuration) => { setDuration(newDuration) }} />
                <HStack>
                    <PersonInput variant="ADULT" value={adults} onIncrease={() => setAdults(adults => adults + 1)} onDecrease={() => setAdults(adults => adults - 1)} />
                    <PersonInput variant="CHILD" value={children} onIncrease={() => setChildren(children => children + 1)} onDecrease={() => setChildren(children => children - 1)} />
                </HStack>
                <Button onClick={() => loadRooms()} disabled={isLoading} size="lg" colorScheme="blue">Suche</Button>
            </HStack>
            <Divider />
            <Box>
                <Heading mt="8" mb="4" size="md" textAlign="center">Verfügbare Zimmer:</Heading>
                {
                    isLoading ? <Center><Spinner /></Center> :
                        <Flex wrap="wrap" justify="space-around"  >
                            {rooms ? rooms.map((r, index) => <Room room={r} onSelect={() => {
                                setSelectedRoom(r)
                                navigate("/booking")
                            }} />) : <Text>keine Zimmer geladen</Text>}
                        </Flex>
                }

                {errorMessage.length > 0 && <Text>{errorMessage}</Text>}
            </Box>
        </Box>

    )

}

export default RoomSelectionPage


