import { FarmDataType } from "@/components/list/types";
import React, { ReactNode, createContext, useContext, useState } from "react";

const FarmsContext = createContext<{
    setFarms: React.Dispatch<React.SetStateAction<FarmDataType[] | null>>;
    farms: FarmDataType[] | null;
} | null>(null);

// Access farms list
export function useFarms() {
    return useContext(FarmsContext);
}

export function FarmsProvider({ children }: { children: ReactNode }) {
    const [farms, setFarms] = useState<FarmDataType[] | null>(null);

    return (
        <FarmsContext.Provider
            value={{
                setFarms,
                farms,
            }}
        >
            {children}
        </FarmsContext.Provider>
    );
}
