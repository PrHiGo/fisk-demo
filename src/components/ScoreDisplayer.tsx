import React, { useState } from "react";


export const ScoreDisplayer = () => {
    const [score, setScore] = useState(0);

    const handleFishHit = () => {
        setScore(score + 10);
    }


    return (
        <>
            <div>
                <h1>`Score: ${score}`</h1>
            </div>
        </>
    )
};