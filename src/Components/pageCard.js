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

    useEffect(() => {
        if (path) {
            axios.get("https://en.wikipedia.org/api/rest_v1/page/summary/" + path.substring(2),
                { headers: { 'Api-User-Agent': 'https://github.com/LunarUndertow/' } })
                .then((response) => {
                    setPage(response.data); })
                .catch((error) => console.error(error));
        }
    }, [path]);


    const articleUrl = () => {
        if (path) return "https://en.wikipedia.org/api/rest_v1/page/html/" + path.substring(2);
        return '';
    }
    

    const title = () => {
        if (page) return page.title;
    };


    const extract = () => {
        if (page) return page.extract;
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 1200,
        maxHeight: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflow: 'scroll',
      };


    return (
        <div>
            <Card sx={{ maxWidth: 400, margin: 2 }}>
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
                    <div><a href={articleUrl()}>{articleUrl()}</a></div>
                    <ModalPage pageUrl={articleUrl()} />
                </Box>
            </Modal>
        </div>
    );
}

export default PageCard;
