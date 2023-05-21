import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { load } from 'cheerio';
import PageCard from './Components/pageCard';
import Grid2 from '@mui/material/Unstable_Grid2';

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
                        return pname.attr('href');
                    })
                    .toArray();
                setPageNames(titles);
            });
    }, [])


    const randomPageName = () => {
        if (pageNames) return pageNames[Math.floor(Math.random() * pageNames.length)];
    }


    return (
        <div className="App">
        <header className="App-header">
            <Grid2 container>
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
            </Grid2>
        </header>
        </div>
    );
}

export default App;
