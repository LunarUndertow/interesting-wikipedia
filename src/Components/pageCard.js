import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

function PageCard(props) {
    const path = props.path;
    const [page, setPage] = useState(null)

    useEffect(() => {
        if (path) {
            axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + path.substring(2))
                .then((response) => {
                    setPage(response.data);
                });
        }
    }, [path]);
    

    const title = () => {
        if (page) return page.title;
    };


    const extract = () => {
        if (page) return page.extract;
    };


    const link = () => {
        if (path) return "https://en.wikipedia.org/wiki/" + path.substring(2);
    };


    return (
        <Card sx={{ maxWidth: 400, margin: 2 }}>
            <CardActionArea href={page ? "https://en.wikipedia.org/wiki/" + path.substring(2) : ''}>
                <CardMedia 
                    component="img"
                    height="150"
                    image={page && page.thumbnail ? page.thumbnail.source : 'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg'}
                    alt="Wikipedia image thumbnail"
                />
                <CardContent>
                    <h3>
                        { title() }
                    </h3>
                    <div>
                        { extract() }
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default PageCard;
