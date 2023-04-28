import logo from "./logo.svg";
import "./App.css";
import GoogleMap from "./GoogleMapCom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">KMUTNB Smart Service</h1>
        <GoogleMap />
      </header>
    </div>
  );
}

export default App;
