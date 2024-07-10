import {useEffect, useState} from "react";
import {MAX_FEE, RATE_PER_BLOCK} from "./App";

const Car = ({licensePlate, entryTime, onDeparture}) => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeSpent = now - entryTime;
            const timeBlocks = Math.ceil(timeSpent / 30000);
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
        <tr className="border-b border-dark-blue text-center">
            <td className="py-4 px-4">{licensePlate}</td>
            <td className="py-4 px-4">{formatTime(timeSpent)}</td>
            <td className="py-4 px-4">${fee}</td>
            <td className="py-4 px-4">
                <button
                    onClick={() => onDeparture(licensePlate)}
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-950 transition"
                >
                    Depart
                </button>
            </td>
        </tr>
    );
};

export default Car;