import React, {useState} from 'react';
import './App.css';
import CarList from "./CarList";

const MAX_CARS = 3;
const RATE_PER_BLOCK = 1;
const MAX_FEE = 4;

const LicensePlateRegex = /^[A-Za-z]{4}\d{3}$/;

const App = () => {
    const [cars, setCars] = useState([]);
    const [licensePlate, setLicensePlate] = useState('');
    const [error, setError] = useState('');

    const handleArrival = () => {
        if (cars.length >= MAX_CARS) {
            setError('Garage is full. Deny entry to new cars.');
        } else if (!LicensePlateRegex.test(licensePlate)) {
            setError('Invalid license plate. Please enter a valid Ontario license plate.');
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
                <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="Enter license plate"
                />
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
