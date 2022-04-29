import { Box, Button, Center, Divider, Flex, Heading, HStack, Spinner, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useRooms } from './hooks';
import DateInput from './components/DateInput/DateInput';
import PersonInput from './components/PersonInput/PersonInput';
import Room from './components/Room/Room';
import { RoomType } from './types';




function App() {


  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [duration, setDuration] = useState(2)

  const { rooms, loadRooms, isLoading, errorMessage } = useRooms(adults, children, duration)


  return (
    <Box p="3" >
      <Center>
        <Heading>Hotel Buchungen</Heading>
      </Center>
      <HStack justifyContent="space-around" py="4" m="1rem" >
        <DateInput duration={duration} setDuration={(newDuration) => { setDuration(newDuration) }} />

        <HStack>
          <PersonInput variant="ADULT" value={adults} onIncrease={() => setAdults(adults => adults + 1)} onDecrease={() => setAdults(adults => adults - 1)} />
          <PersonInput variant="CHILD" value={children} onIncrease={() => setChildren(children => children + 1)} onDecrease={() => setChildren(children => children - 1)} />
        </HStack>
        <Button onClick={() => loadRooms()} disabled={isLoading} size="lg" colorScheme="teal">Suche</Button>
      </HStack>
      <Divider />

      <Heading mt="8" mb="4" size="md" textAlign="center">Verfügbare Zimmer:</Heading>
      {isLoading ? <Center><Spinner /></Center> :
        <Flex wrap="wrap" justify="space-around">
          {rooms ? rooms.map(r => <Room room={r} />) : <Text>keine Zimmer geladen</Text>}
          {errorMessage.length > 0 && <Text>{errorMessage}</Text>}
        </Flex>}

    </Box>
  );
}

export default App;
