import React, {useState} from 'react';
import CarList from "./CarList";

export const MAX_CARS = 3;
export const RATE_PER_BLOCK = 1;
export const MAX_FEE = 4;

const licensePlateRegex = /^[A-Za-z]{4}\d{3}$/;

const App = () => {
    const [cars, setCars] = useState([]);
    const [licensePlate, setLicensePlate] = useState('');
    const [error, setError] = useState('');

    const handleArrival = () => {
        if (cars.length >= MAX_CARS) {
            setError('Garage is full. Deny entry to new cars.');
        } else if (!licensePlateRegex.test(licensePlate)) {
            setError('Invalid license plate. Please enter a valid Ontario license plate (ABCD123).');
        } else {
            const newCar = {
                licensePlate,
                entryTime: new Date().getTime()
            };
            setCars([...cars, newCar]);
            setLicensePlate('');
            setError('');
        }
    };

    const handleDeparture = (licensePlate) => {
        const car = cars.find(car => car.licensePlate === licensePlate);
        if (car) {
            const timeSpent = new Date().getTime() - car.entryTime;
            const timeBlocks = Math.ceil(timeSpent / 30000);
            const fee = Math.min(timeBlocks * RATE_PER_BLOCK, MAX_FEE);
            alert(`Balance owing for ${licensePlate}: $${fee}`);
            setCars(cars.filter(car => car.licensePlate !== licensePlate));
        }
    };

    return (
        <div className="bg-blue-950 text-white min-h-screen p-4">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
                <text className="text-white">VEHIKL&nbsp;</text>
                <text className="text-orange-600">Parking Garage Management</text>
            </h1>
            <div className="max-w-lg mx-auto bg-white text-blue-950 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Arrival</h2>
                <label>
                    <text className="text-xl font-semibold mb-4">License Plate</text>
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="ABCD123"
                        className="w-full p-2 border border-blue-950 rounded mb-4"
                    />
                </label>
                <button
                    onClick={handleArrival}
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-blue-950 transition"
                >
                    Enter Garage
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            <div className="max-w-lg mx-auto mt-8 bg-white text-blue-950 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Current Cars</h2>
                <CarList cars={cars} onDeparture={handleDeparture}/>
            </div>
        </div>
    );
};

export default App;
