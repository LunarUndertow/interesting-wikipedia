import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { load } from 'cheerio';
import Button from '@mui/material/Button';
import PageCard from './Components/pageCard';

function App() {
    const [pageNames, setPageNames] = useState(null);
    const [dummyState, setDummyState] = useState(1);

    useEffect(() => {
        axios.get("https://en.wikipedia.org/api/rest_v1/page/html/Wikipedia:Unusual_articles",
            { headers: { 'Api-User-Agent': 'https://github.com/LunarUndertow/' } })
            .then(({data}) => {
                const page = load(data);
                const titles = page('.wikitable')
                    .find('b')
                    .find('a')
                    .map((index, name) => {
                        const pname = page(name);
                        return pname.attr('href');
                    })
                    .toArray();
                setPageNames(titles); })
            .catch((error) => console.error(error));
    }, [])


    const randomPageName = () => {
        if (pageNames) return pageNames[Math.floor(Math.random() * pageNames.length)];
    }


    const refresh = () => {
        setDummyState((dummyState + 1) % 2);
    }


    return (
        <div className="App">
        <header className="App-header">
            <div>
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
            </div>
            <Button variant="outlined" size="large" onClick={refresh}>Refresh</Button>
        </header>
        
        </div>
    );
}

export default App;
