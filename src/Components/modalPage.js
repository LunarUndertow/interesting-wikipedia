import axios from 'axios';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

function ModalPage(props) {
    const pageUrl = props.pageUrl;
    const [page, setPage] = useState(null);

    // when pageUrl changes, fetch page from said url and set the html data as state
    useEffect(() => {
        if (pageUrl) {
            axios.get(pageUrl,
                { headers: { 'Api-User-Agent': 'https://github.com/LunarUndertow/' } })
                .then((response) => setPage(response.data))
                .catch((error) => console.error(error));
        }
    }, [pageUrl]);


    // if a page exists, render a sanitized version of it
    return (
        <div>
            {page ? parse(DOMPurify.sanitize(page)) : ''}
        </div>
    );
}

export default ModalPage;