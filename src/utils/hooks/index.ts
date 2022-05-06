import { createStandaloneToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchRooms } from "../api";


import { RoomType } from "../types";




const useRooms = (adults: number = 2, children: number = 0, duration: number = 1) => {
    const toast = createStandaloneToast()
    const [isLoading, setLoading] = useState(false)
    const [rooms, setRooms] = useState<RoomType[]>()
    const [errorMessage, setErrorMessage] = useState("")


    const loadRooms = () => {
        setLoading(true)

        fetchRooms(adults, children, duration).then(rooms => {
            setRooms(rooms)
            toast({ title: "Zimmer geladen", status: "success" })
        }).catch(e => {
            toast({ title: "Anfrage fehlgeschlagen!", description: e, status: "error" })
            setErrorMessage(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
      //  loadRooms()
    }, [])

    return { isLoading, rooms, loadRooms, errorMessage }
}



export { useRooms }