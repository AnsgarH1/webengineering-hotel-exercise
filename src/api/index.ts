import { RoomType } from "../types";
const URL = "https://hsrm-hotel-api.herokuapp.com/rooms";


const fetchRooms = async (adults: number = 2, children: number = 0, duration: number = 1): Promise<RoomType[]> => {

    const response = await fetch(`${URL}?adults=${adults}&children=${children}&duration=${duration}`);

    if (response.ok) {
        const rooms: RoomType[] = await response.json();
        console.log(rooms)
        return rooms
    }
    throw new Error(response.status.toString())
}

export { fetchRooms }