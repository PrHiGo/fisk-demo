import React, { useState, useEffect } from "react";
import { Fish } from "./Fish"; // Antag att din Fish-komponent är definierad någon annanstans

interface FishObject {
    id: number;
    active: boolean;
}

const createFishObject = (id: number): FishObject => ({
    id,
    active: false, // Inledningsvis inaktiva
});

export const FishPool = () => {
    const [fishPool, setFishPool] = useState<FishObject[]>(() =>
        Array.from({ length: 10 }, (_, i) => createFishObject(i))
    );

    const activateFish = () => {
        // Hitta första inaktiva fisken och aktivera
        const index = fishPool.findIndex((fish) => !fish.active);
        if (index !== -1) {
            // Aktivera endast en fisk åt gången
            setFishPool((currentFishPool) =>
                currentFishPool.map((fish, i) =>
                    i === index ? { ...fish, active: true } : fish
                )
            );
        }
    };

    useEffect(() => {
        // Sätt upp ett intervall för att aktivera fiskar
        const interval = setInterval(() => {
            activateFish();
        }, 5000);

        return () => clearInterval(interval);
    }, [fishPool]);

    return (
        <>
            {fishPool.filter((fish) => fish.active).map((fish) => (
                <Fish key={fish.id} />
            ))}
        </>
    );
};
