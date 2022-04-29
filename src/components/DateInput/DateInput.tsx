import { Box, Flex, FormControl, FormLabel, Heading, HStack, IconButton, Input, InputGroup, Text } from '@chakra-ui/react'
import { DateTime, Interval } from 'luxon'
import React, { ChangeEventHandler, useEffect, useState } from 'react'

interface DateInputProps {
  duration: number,
  setDuration: (arg0: number) => void
}

const getDayDiff = (start: DateTime, end: DateTime): number => {
  const interval = Interval.fromDateTimes(start, end)
  return interval.count("days")
}

function DateInput({ duration, setDuration }: DateInputProps) {
  
  const nextFriday = DateTime.now().plus({ days: 3 }).endOf('week').minus({ days: 2 })

  const [startDate, setStartDate] = useState<DateTime>(nextFriday)
  const [endDate, setEndDate] = useState<DateTime>(nextFriday.plus({ days: 2 }))

  useEffect(() => {
    const days = getDayDiff(startDate, endDate)
    setDuration(days)
    console.log("changed!")
  }, [startDate, endDate])

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = DateTime.fromISO(event.target.value)
    setStartDate(newStart)
    setEndDate(newStart.plus({ days: 2 }))
  }
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = DateTime.fromISO(event.target.value)
    setEndDate(newEnd)
  }



  return (
    <HStack borderWidth={2} p="2" borderRadius="md">
      <FormControl >
        <FormLabel>Von</FormLabel>
        <Input type="date" value={startDate.toISODate()} onChange={handleStartDateChange} min={DateTime.now().toISODate()} />
      </FormControl>
      <FormControl >
        <FormLabel>Bis</FormLabel>
        <Input type="date" value={endDate.toISODate()} min={startDate.plus({ day: 1 }).toISODate()} onChange={handleEndDateChange} />
      </FormControl>
      <Text w="64">Anzahl Tage: {duration}</Text>
    </HStack>
  )
}

export default DateInput