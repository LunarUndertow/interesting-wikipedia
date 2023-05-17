import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { load } from 'cheerio';

function App() {
    const [pageNames, setPageNames] = useState(null);

    useEffect(() => {
        axios.get("https://en.wikipedia.org/api/rest_v1/page/html/Wikipedia:Unusual_articles")
            .then(({data}) => {
                const page = load(data);
                const titles = page('.wikitable')
                    .find('a')
                    .map((index, name) => {
                        const pname = page(name);
                        return pname.text();
                    })
                    .toArray();
                setPageNames(titles);
            });
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
            { pageNames }
        </header>
        </div>
    );
}

export default App;
