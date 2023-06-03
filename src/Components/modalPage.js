import axios from 'axios';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import { load } from 'cheerio';

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


    // Sanitize the fetched page and replace relative links with absolute ones
    const processedHtml = () => {
        const sanitizedPage = DOMPurify.sanitize(page);
        const html = load(sanitizedPage, { FORCE_BODY: true, ALLOWED_ATTR: ['style'] })
        html('a').each((i, elem) => {
            if (html(elem).attr('href') && html(elem).attr('href').startsWith('./')) {
                const path = html(elem).attr('href').substring(1)
                html(elem).attr('href', 'https://en.wikipedia.org/wiki' + path);
            }
        });
        const pageWithAbsoluteLinks = html.html();
        return parse(pageWithAbsoluteLinks);
    };


    // if a page has been set, process and render it
    return (
        <div>
            {page ? processedHtml() : ''}
        </div>
    );
}

export default ModalPage;