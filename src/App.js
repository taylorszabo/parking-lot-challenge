import React, {useState} from 'react';
import './App.css';
import CarList from "./CarList";

const MAX_CARS = 3;
const RATE_PER_BLOCK = 1;
const MAX_FEE = 4;

const App = () => {
    const [cars, setCars] = useState([]);
    const [licensePlate, setLicensePlate] = useState('');


    const handleArrival = () => {
        if (cars.length >= MAX_CARS) {
            alert('Garage is full. Deny entry to new cars.');
        } else {
            const newCar = {
                licensePlate,
                entryTime: new Date().getTime()
            };
            setCars([...cars, newCar]);
            setLicensePlate('');
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
            </div>
            <div>
                <h2>Current Cars</h2>
                <CarList cars={cars} onDeparture={handleDeparture}/>
            </div>
        </div>
    );
};

export default App;
