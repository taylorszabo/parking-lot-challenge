import React from "react";
import Car from "./Car";

const CarList = ({cars, onDeparture}) => {
    return (
        <div>
            {cars.length === 0 ? (
                <p>No cars in the garage.</p>
            ) : (
                <table>
                    <tr>
                        <th>License Plate</th>
                        <th>Time</th>
                        <th>Owes</th>
                        <th>Submit</th>
                    </tr>
                    {cars.map(car => (
                        <Car
                            key={car.licensePlate}
                            licensePlate={car.licensePlate}
                            entryTime={car.entryTime}
                            onDeparture={onDeparture}
                        />
                    ))}
                </table>
            )}
        </div>
    );
};

export default CarList;