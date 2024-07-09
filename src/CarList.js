import React from "react";
import Car from "./Car";

const CarList = ({cars, onDeparture}) => {
    return (
        <div>
            {cars.length === 0 ? (
                <p>No cars in the garage.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr className="w-full bg-blue-950 text-white">
                            <th className="py-2 px-4 text-center">License Plate</th>
                            <th className="py-2 px-4 text-center">Time</th>
                            <th className="py-2 px-4 text-center">Owes</th>
                            <th className="py-2 px-4 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cars.map(car => (
                            <Car
                                key={car.licensePlate}
                                licensePlate={car.licensePlate}
                                entryTime={car.entryTime}
                                onDeparture={onDeparture}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CarList;