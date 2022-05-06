import { useEffect, useState } from 'react';
import { Box, Button, Center, Divider, Flex, Heading, HStack, Spinner, Text, useToast, VStack } from '@chakra-ui/react';


import Layout from './components/Layout/Layout';

import DateInput from './components/ui/DateInput/DateInput';
import PersonInput from './components/ui/PersonInput/PersonInput';
import Rooms from './components/sections/Rooms/Rooms';
import { useRooms } from './utils/hooks';
import { RoomType } from './utils/types';
import Booking from './components/sections/Booking/Booking';




function App() {
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [duration, setDuration] = useState(2)

  const [selectedRoom, setSelectedRoom] = useState<RoomType>();

  const { rooms, loadRooms, isLoading, errorMessage } = useRooms(adults, children, duration)

  if (selectedRoom) {
    return (
      <Layout>
        <Booking room={selectedRoom} />
      </Layout>
    )
  }

  return (
    <Layout>
      <HStack justifyContent="space-around" py="4" m="1rem" >
        <DateInput duration={duration} setDuration={(newDuration) => { setDuration(newDuration) }} />

        <HStack>
          <PersonInput variant="ADULT" value={adults} onIncrease={() => setAdults(adults => adults + 1)} onDecrease={() => setAdults(adults => adults - 1)} />
          <PersonInput variant="CHILD" value={children} onIncrease={() => setChildren(children => children + 1)} onDecrease={() => setChildren(children => children - 1)} />
        </HStack>
        <Button onClick={() => loadRooms()} disabled={isLoading} size="lg" colorScheme="blue">Suche</Button>
      </HStack>
      <Divider />
      <Rooms rooms={rooms} isLoading={isLoading} errorMessage={errorMessage} setSelectedRoom={(room) => setSelectedRoom(room)} />

    </Layout>
  );
}

export default App;
