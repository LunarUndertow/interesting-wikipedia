import axios from 'axios';
import { useEffect, useState } from 'react';

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


    const thumbnail = () => {
        if (page && page.thumbnail) return <img src={page.thumbnail.source} alt="Wikipedia image thumbnail" />;
    }


    return (
        <span>
            <div>
                { title() }
            </div>
            <div>
                { thumbnail() }
            </div>
            <div>
                { extract() }
            </div>
        </span>
    );
}

export default PageCard;
