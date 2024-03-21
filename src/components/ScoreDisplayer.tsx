import React from "react";

export const ScoreDisplayer = ({ score }: { score: number }) => {
    return (

        <div className="absolute">
            <h1>`Score: ${score}`</h1>
        </div>

    )
};