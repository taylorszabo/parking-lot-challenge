import React, {useState} from 'react';
import './App.css';
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
            const timeBlocks = Math.ceil(timeSpent / 30000); // 30 seconds blocks
            const fee = Math.min(timeBlocks * RATE_PER_BLOCK, MAX_FEE);
            alert(`Balance owing for ${licensePlate}: $${fee}`);
            setCars(cars.filter(car => car.licensePlate !== licensePlate));
        }
    };

    return (
        <div className="App">
            <h1>Parking Garage Management</h1>
            <div>
                <h2>Arrival</h2>
                <label>
                    License Plate:
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="ABCD123"
                    />
                </label>
                <button onClick={handleArrival}>Enter Garage</button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div>
                <h2>Current Cars</h2>
                <CarList cars={cars} onDeparture={handleDeparture}/>
            </div>
        </div>
    );
};

export default App;
