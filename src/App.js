import './App.css';

const App = () => {
    return (
        <div className="App">
            <h1>Parking Garage Management</h1>
            <div>
                <h2>Arrival</h2>
                <input
                    type="text"
                    value={licensePlate}
                    placeholder="Enter license plate"
                />
                <button>Enter Garage</button>
            </div>
            <div>
                <h2>Current Cars</h2>
            </div>
        </div>
    );
};

export default App;
