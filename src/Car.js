import {useEffect, useState} from "react";
import {MAX_FEE, RATE_PER_BLOCK} from "./App";

const Car = ({licensePlate, entryTime, onDeparture}) => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeSpent = now - entryTime;
            const timeBlocks = Math.max(Math.ceil((timeSpent - 30000) / 30000), 0);
            const fee = Math.min(timeBlocks * RATE_PER_BLOCK, MAX_FEE);

            setTimeSpent(timeSpent);
            setFee(fee);
        }, 1000);

        return () => clearInterval(interval);
    }, [entryTime]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    };

    return (
        <tr>
            <td>{licensePlate}</td>
            <td>{formatTime(timeSpent)}</td>
            <td>${fee}</td>
            <td>
                <button onClick={() => onDeparture(licensePlate)}>Depart</button>
            </td>
        </tr>
    );
};

export default Car;