import React from "react";

const CarList = ({cars, onDeparture}) => {
    return (
        <div>
            {cars.length === 0 ? (
                <p>No cars in the garage.</p>
            ) : (
                <ul>
                    {cars.map(car => (
                        <li>
                            {car.licensePlate}
                            <button onClick={() => onDeparture(car.licensePlate)}>Depart</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CarList;