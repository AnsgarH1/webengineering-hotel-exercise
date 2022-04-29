import { useEffect, useState } from "react"
import { DateTime, Interval } from "luxon"

const getDayDiff = (start: DateTime, end: DateTime): number => {
    const interval = Interval.fromDateTimes(start, end)
    return interval.count("days")
}

const getNextFriday = () => DateTime.now().plus({ days: 3 }).endOf('week').minus({ days: 2 })

const useDateRange = (duration: number, setDuration: (arg0: number) => void) => {

    const nextFriday = getNextFriday()

    const [startDate, setStartDate] = useState<DateTime>(nextFriday)
    const [endDate, setEndDate] = useState<DateTime>(nextFriday.plus({ days: 2 }))


    useEffect(() => {
        const days = getDayDiff(startDate, endDate)
        setDuration(days)
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

    return {
        startDateAsIsoDate: startDate.toISODate(),
        endDateAsIsoDate: endDate.toISODate(),
        onStartDateChange: handleStartDateChange,
        onEndDateChange: handleEndDateChange,
        duration,
        nowAsIsoDate: DateTime.now().toISODate(),
        calculatedEndDateAsIsoDate: startDate.plus({ day: 2 }).toISODate()
    }


}

export default useDateRange