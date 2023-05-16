import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            await fetch("https://en.wikipedia.org/api/rest_v1/page/html/Wikipedia:Unusual_articles")
                .then(response => response.text())
                .then(data => setData(data))
                .catch(error => console.error(error));
        };
        
        getData();
    }, [])

    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
            Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
        
        </div>
    );
}

export default App;
