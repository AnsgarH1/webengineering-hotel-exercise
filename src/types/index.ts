export type RoomType = {
    name: string,
    amount: number;
    beds: { forChildren: boolean, doubleBed: boolean }[];
    price: number;
}
