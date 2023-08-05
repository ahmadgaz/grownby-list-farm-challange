export type FarmDataType = {
    id: number;
    displayname: string;
    name: string;
    phone?: string;
    hours?: {
        sunday?: [number, number];
        monday?: [number, number];
        tuesday?: [number, number];
        wednesday?: [number, number];
        thursday?: [number, number];
        friday?: [number, number];
        saturday?: [number, number];
    };
    image?: string;
};
