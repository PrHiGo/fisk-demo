import React, { useState, useEffect } from 'react';
import { Fish } from './Fish';

// Defines the properties each fish object will have
interface FishObject {
    id: number;
    active: boolean;
}

const createFishObject = (id: number): FishObject => ({
    id,
    active: false, // All fish start as inactive
});

export const FishPool: React.FC = () => {
    const [fishPool, setFishPool] = useState<FishObject[]>(() =>
        Array.from({ length: 100 }, (_, i) => createFishObject(i))
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

        const interval = setInterval(activateFish, 2000);

        return () => clearInterval(interval);
    }, [fishPool]);


    const deactivateFish = (id: number) => {
        setFishPool(currentFishPool =>
            // Update the fish pool, setting the specified fish to inactive
            currentFishPool.map(fish =>
                fish.id === id ? { ...fish, active: false } : fish
            )
        );
    };

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
