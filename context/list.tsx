import { FarmDataType } from "@/components/list/types";
import { router, useSegments } from "expo-router";
import { User } from "firebase/auth";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const FarmsContext = createContext<{
    setFarms: (farms: FarmDataType[]) => void;
    farms: FarmDataType[];
} | null>(null);

// Access farms list
export function useFarms() {
    return useContext(FarmsContext);
}

export function FarmsProvider({ children }: { children: ReactNode }) {
    const [farms, setFarmList] = useState<FarmDataType[]>([]);

    return (
        <FarmsContext.Provider
            value={{
                setFarms: (farms: FarmDataType[]) => setFarmList(farms),
                farms,
            }}
        >
            {children}
        </FarmsContext.Provider>
    );
}
