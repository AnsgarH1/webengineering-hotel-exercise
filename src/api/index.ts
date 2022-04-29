import { createApi } from "unsplash-js";
import { RoomType } from "../types";

import secrets from "./secrets.json"

const fetchRooms = async (adults: number = 2, children: number = 0, duration: number = 1): Promise<RoomType[]> => {
    const URL = "https://hsrm-hotel-api.herokuapp.com/rooms";

    const response = await fetch(`${URL}?adults=${adults}&children=${children}&duration=${duration}`);

    if (response.ok) {
        const rooms: RoomType[] = await response.json();
        console.log(rooms)
        return rooms
    }
    throw new Error(response.status.toString())
}


const getHotelImage = async (query: string) => {
    const unsplash_api = createApi({
        accessKey: secrets.UNSPLASH_ACCESS_KEY
    })


    const res = await unsplash_api.search.getPhotos({ query: query, orientation: "landscape" })
    console.log(res)
    if (res.response) {
        return res.response.results.map(photo => photo.urls.small.toString())
    }
    throw Error(res.errors[0])



}
export { fetchRooms, getHotelImage }
