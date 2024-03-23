import React, { useState, useEffect } from 'react';
import { Fish } from './Fish'; // Assuming your Fish component is defined elsewhere

// Defines the properties each fish object will have
interface FishObject {
    id: number;     // Unique identifier for each fish
    active: boolean; // Whether the fish is active (visible) or not
}

// A helper function to create a new fish object
const createFishObject = (id: number): FishObject => ({
    id,
    active: false, // All fish start as inactive
});

export const FishPool: React.FC = () => {
    const [fishPool, setFishPool] = useState<FishObject[]>(() =>
        Array.from({ length: 100 }, (_, i) => createFishObject(i))
    );

    // This function will look for the first inactive fish and make it active
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

    // Effect to regularly activate fish every 5 seconds
    useEffect(() => {
        const interval = setInterval(activateFish, 5000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [fishPool]); // Re-run this effect if the fishPool state changes

    // Function to deactivate a fish by its id
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
