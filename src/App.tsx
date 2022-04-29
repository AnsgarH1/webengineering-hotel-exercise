import { Box, Button, Center, Divider, Flex, Heading, HStack, Spinner, Text, useToast, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRooms } from './hooks';
import DateInput from './components/DateInput/DateInput';
import PersonInput from './components/PersonInput/PersonInput';
import Room from './components/Room/Room';
import { RoomType } from './types';
import { getHotelImage } from './api';




function App() {
  const toast = useToast()


  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [duration, setDuration] = useState(2)

  const { rooms, loadRooms, isLoading, errorMessage } = useRooms(adults, children, duration)
  const [imageURLs, setImageURls] = useState<String[]>()

  useEffect(() => {
    getHotelImage("hotelroom")
      .then(images => {
        console.log("images:" + images)
        setImageURls(images)
        toast({ title: "Bilder wurden im Hintergrund geladen!", status: "info" })
      })
      .catch(e => {
        toast({ title: "Bilder konnten im Hintergrund nicht geladen werden!", status: "warning" })
        console.log(e)
      })
  }, [])

  return (
    <Center >
      <VStack p="3" width="80%" maxW="1400px" >

        <Heading>Hotel Buchungen</Heading>

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
          <Flex wrap="wrap" justify="space-around"  >
            {rooms ? rooms.map((r, index) => <Room room={r} image={imageURLs ? imageURLs[index] as string : null} />) : <Text>keine Zimmer geladen</Text>}
          </Flex>}

        {errorMessage.length > 0 && <Text>{errorMessage}</Text>}

      </VStack >
    </Center>
  );
}

export default App;
