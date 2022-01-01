import axiosInstance from "../axios";
import { useEffect, useState, useRef } from "react";

const useFetch = (url) => {
    const cache = useRef({});
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setStatus('fetching');
            if (cache.current[url]) {
                console.log('cached')
                const data = cache.current[url];
                setData(data);
                setStatus('fetched');
            } else {
                console.log('fatching...')
                const data = await axiosInstance.get(url);
                cache.current[url] = data; // set response in cache;
                setData(data);
                setStatus('fetched');
            }
        };

        fetchData();
    }, [url]);

    return { status, data };
};

export default useFetch;