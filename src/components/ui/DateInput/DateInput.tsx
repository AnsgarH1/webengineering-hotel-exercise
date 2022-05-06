import React from 'react'
import { Box, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Input, InputGroup, Text } from '@chakra-ui/react'

import useDateRange from './dateRange'

interface DateInputProps {
  duration: number,
  setDuration: (arg0: number) => void
}


function DateInput({ duration, setDuration }: DateInputProps) {

  const { startDateAsIsoDate, endDateAsIsoDate, onStartDateChange, onEndDateChange, nowAsIsoDate, calculatedEndDateAsIsoDate } = useDateRange(duration, setDuration)

  return (
    <HStack borderWidth={2} p="2" borderRadius="md">
      <FormControl>
        <FormLabel>Von</FormLabel>
        <Input type="date" value={startDateAsIsoDate} onChange={onStartDateChange} min={nowAsIsoDate} />
      </FormControl>
      <FormControl >
        <FormLabel>Bis</FormLabel>
        <Input type="date" value={endDateAsIsoDate} min={calculatedEndDateAsIsoDate} onChange={onEndDateChange} />
      </FormControl>
      <Text w="64">Anzahl Tage: {duration}</Text>
    </HStack>
  )
}

export default DateInput