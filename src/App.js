import React, {useState} from 'react';
import './App.css';

const MAX_CARS = 3;

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
            </div>
        </div>
    );
};

export default App;
