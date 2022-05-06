import { createStandaloneToast } from "@chakra-ui/react"
import React, { useState, useContext } from "react"
import { fetchRooms } from "../api"
import { RoomType, UserType } from "../types"

type InputData = {
    adults: number,
    children: number,
    duration: number
}

interface BookingContextProps {
    selectedRoom: RoomType | undefined,
    rooms: RoomType[] | undefined,
    setSelectedRoom: (arg0: RoomType) => void,
    loadRooms: () => void,
    isLoading: boolean,
    setInputParams: (arg0: InputData) => void
    errorMessage: string,
}

const initialContextValues: BookingContextProps = {
    selectedRoom: undefined,
    loadRooms: () => { },
    setSelectedRoom: () => { },
    isLoading: false,
    errorMessage: "",
    setInputParams: () => { },
    rooms: undefined

}

export const BookingContext = React.createContext<BookingContextProps>(initialContextValues)

export const useBookingContext = () => useContext(BookingContext)

export function BookingContextProvider({ children }: { children: React.ReactChild | React.ReactChild[] }) {

    const [selectedRoom, setSelectedRoom] = useState<RoomType>()
    const toast = createStandaloneToast()
    const [isLoading, setLoading] = useState(false)
    const [rooms, setRooms] = useState<RoomType[]>()
    const [errorMessage, setErrorMessage] = useState("")

    const [inputParams, setInputParams] = useState<InputData>({ adults: 2, children: 2, duration: 2 })

    const loadRooms = () => {
        setLoading(true)

        fetchRooms(inputParams.adults, inputParams.children, inputParams.duration).then(rooms => {
            setRooms(rooms)
            toast({ title: "Zimmer geladen", status: "success" })
        }).catch(e => {
            toast({ title: "Anfrage fehlgeschlagen!", description: e, status: "error" })
            setErrorMessage(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <BookingContext.Provider
            value={{
                rooms,
                loadRooms,
                selectedRoom,
                setSelectedRoom,
                errorMessage,
                setInputParams,
                isLoading
            }}>
            {children}
        </BookingContext.Provider>
    )

}
