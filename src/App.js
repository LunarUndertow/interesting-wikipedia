import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { load } from 'cheerio';
import Button from '@mui/material/Button';
import PageCard from './Components/pageCard';
import Box from '@mui/material/Box';

function App() {
    const [pageNames, setPageNames] = useState(null);
    const [dummyState, setDummyState] = useState(1);

    // When the component is loaded, fetch the Unusual articles page
    // from the API and find desired information from it. The unusual
    // articles are listed inside wikitable class elements and in bold
    // elements to make them stand out. Thus we select links in b elements
    //  to exclude links in the non-b description sections.
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


    // Return a random article pathname from the pageNames array
    const randomPageName = () => {
        if (pageNames) return pageNames[Math.floor(Math.random() * pageNames.length)];
    }


    // A function to update state and trigger a refresh without needing to
    // call setPageNames and fetch and process the page again. Alternate way
    // to do this could be randomizing article names into an array held inside
    // a useState and tying the array length to how many PageCard elements to render
    const refresh = () => {
        setDummyState((dummyState + 1) % 2);
    }


    return (
        <div className="App">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
                <PageCard path={randomPageName()} />
            </Box>
            <Button variant="outlined" size="large" onClick={refresh}>Refresh</Button>
        </div>
    );
}

export default App;
