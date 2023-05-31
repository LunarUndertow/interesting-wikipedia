import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, CardActionArea, Modal } from '@mui/material';
import ModalPage from './modalPage';

function PageCard(props) {
    const path = props.path;
    const [page, setPage] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // when pathname gets updated, fetch summary for said article and it set as state
    useEffect(() => {
        if (path) {
            axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + path.substring(2),
                { headers: { 'Api-User-Agent': 'https://github.com/LunarUndertow/' } })
                .then((response) => {
                    setPage(response.data); })
                .catch((error) => console.error(error));
        }
    }, [path]);


    // if pathname has been set, return URL for API call
    const apiUrl = () => {
        if (path) return "https://en.wikipedia.org/api/rest_v1/page/html/" + path.substring(2);
        return '';
    }


    // if pathname has been set, return URL for human user
    const articleUrl = () => {
        if (path) return "https://en.wikipedia.org/wiki/" + path.substring(2);
        return '';
    }
    

    // if page summary has been fetched, return its title field
    const title = () => {
        if (page) return page.title;
    };


    // if page summary has been fetched, return its extract field
    const extract = () => {
        if (page) return page.extract;
    };


    // define style for modal
    const style = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 1200,
        maxHeight: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
      };


    // Render a card for article summary, including an image slice (defaults to logo if no image),
    // article title and articl extract. Define a modal view within which to render the whole article
    // as a ModalPage component, alongside article URL cited as the source.
    return (
        <Box sx={{ maxWidth: 400, minWidth: 250, flexBasis: 250, flexGrow: 1, margin: 2 }}>
            <Card>
                <CardActionArea onClick={handleOpen}>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-wikipedia-article"
                aria-describedby="modal-wikipedia-article"
            >
                <Box sx={style}>
                    <div className='source'>Source: <a href={articleUrl()}>{articleUrl()}</a></div>
                    <ModalPage pageUrl={apiUrl()} />
                </Box>
            </Modal>
        </Box>
    );
}

export default PageCard;
