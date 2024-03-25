import React, { useState, useEffect, useCallback } from 'react';
import { Fish } from './Fish';

interface FishObject {
    id: number;
    active: boolean;
}

const createFishObject = (id: number): FishObject => ({
    id,
    active: false,
});

export const FishPool: React.FC = () => {
    const [fishPool, setFishPool] = useState<FishObject[]>(() =>
        Array.from({ length: 120 }, (_, i) => createFishObject(i))
    );

    // Effect to regularly activate fish every x seconds
    useEffect(() => {

        const activateFish = () => {
            // Find the index of the first fish that is inactive
            const index = fishPool.findIndex(fish => !fish.active);

            if (index !== -1) { // Check if an inactive fish was found
                setFishPool(currentFishPool =>
                    // Update our array of fish, changing the found fish to active
                    currentFishPool.map((fish, i) =>
                        i === index ? { ...fish, active: true } : fish
                    )
                );
            }
        };

        const interval = setInterval(activateFish, 0);

        return () => clearInterval(interval);
    }, [fishPool]);


    const deactivateFish = useCallback((id: number) => {
        setFishPool(currentFishPool =>
            currentFishPool.map(fish =>
                fish.id === id ? { ...fish, active: false, position: { x: 0, y: -1000, z: 0 } } : fish
            )
        );
    }, []);

    /*     const activateFish = useCallback(() => {
            // Create logic and use if needed 
        }, []); */

    return (
        <>
            {fishPool.filter(fish => fish.active).map((fish, index) => (
                <Fish
                    key={fish.id}
                    id={fish.id}
                    onCollide={() => deactivateFish(fish.id)}
                />
            ))}
        </>
    );
};
