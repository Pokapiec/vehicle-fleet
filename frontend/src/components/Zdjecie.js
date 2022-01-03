import React, { useEffect, useState, useContext } from 'react';
import '../styles/Zdjecie.scss'
import Filterimages from './FilterImages';
import axiosInstance from '../axios.js';
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver'
import { Paths, Measurements } from '../Context';


const Zdjecie = () => {
    const { measurements, setMeasurements } = useContext(Measurements);
    const { paths, setPaths } = useContext(Paths);

    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [path, setPath] = useState('');

    const filterProps = {
        setDateFrom: setDateFrom,
        setDateTo: setDateTo,
        setPath: setPath,
        paths: paths,
    }

    const [przekroczs, setPrzekroczs] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        let condition = []
        if (dateFrom) condition.push('Date.parse(elem.timestamp) > Date.parse(dateFrom)')
        if (dateTo) condition.push('Date.parse(elem.timestamp) < Date.parse(dateTo)')
        if (path) condition.push('elem.trasa == path')

        if (condition.length > 0) {
            let filtersApplied = przekroczs.filter(elem => {
                return eval(condition.join(' & '))
            })
            setFiltered(filtersApplied)
        } else {
            setFiltered(przekroczs)
        }
    }, [dateFrom, dateTo, path]);

    const flattenData = (data) => {
        let arr = []
        data.forEach(elem => {
            let pom = { ...elem }
            let przekroczenia = []
            elem.czujniki.forEach(inner => {
                pom[inner.mierzona_wielkosc] = inner.wartosc
                pom[inner.mierzona_wielkosc] = inner.wartosc
                if (inner.czy_norma_przekroczona) {
                    przekroczenia.push(inner.mierzona_wielkosc)
                }
            })
            pom['przekroczenie'] = przekroczenia.join(', ')
            arr.push(pom)
        })
        return arr
    }

    const getTypesFromData = (data) => {
        const types = []
        data.forEach(item => {
            item.czujniki.forEach(elem => {
                if (!types.includes(elem.mierzona_wielkosc))
                    types.push(elem.mierzona_wielkosc)
            })
        })
        return types
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await axiosInstance.get('przekroczenia/')
            console.log(data)
            setPrzekroczs(flattenData(data.data))
            setFiltered(flattenData(data.data))
            // const reduced = data.data.map(item => item.mierzona_wielkosc)
            setMeasurements(getTypesFromData(data.data))
            setPaths([...new Set(data.data.map(item => item.trasa))])
            // setPaths(types.data.trasy)
            // setMeasurements(types.data.mierzone_wartosci)
        }
        fetchData()
    }, [])

    function downloadImage(e) {
        const source = e.currentTarget.previousSibling.src
        // console.log(source)
        const fileName = source.split('/').pop();
        var el = document.createElement("a");
        el.setAttribute("href", source);
        el.setAttribute("download", fileName);
        document.body.appendChild(el);
        el.click();
        el.remove();
    }

    // function downloadImage(e) {
    //     const src = e.currentTarget.previousSibling.src
    //     const img = new Image();
    //     img.crossOrigin = 'anonymous';  // This tells the browser to request cross-origin access when trying to download the image data.
    //     // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#Implementing_the_save_feature
    //     img.src = src;
    //     img.onload = () => {
    //       // create Canvas
    //       const canvas = document.createElement('canvas');
    //       const ctx = canvas.getContext('2d');
    //       canvas.width = img.width;
    //       canvas.height = img.height;
    //       ctx.drawImage(img, 0, 0);
    //       // create a tag
    //       const a = document.createElement('a');
    //       a.download = 'download.png';
    //       a.href = canvas.toDataURL('image/png');
    //       a.click();
    //       a.remove();
    //     };
    //   }
    // const downloadJpg = (e) => {
    //     var element = document.createElement("a");
    //     var file = new Blob(
    //       [
    //         // e.currentTarget.previousSibling.src
    //         "https://www.dronexvision.pl/sites/default/files/gallery/drone-x-vision-zdjecie-z-powietrza-jeziora-mazurskie-1000x667.jpg"
    //       ],
    //       { type: "image/*" }
    //     );
    //     element.href = URL.createObjectURL(file);
    //     element.download = "image.jpg";
    //     element.click();
    //   };
    // const downloadJpg = async(e) => {
    //     const originalImage=`${e.currentTarget.previousSibling.src}`;
    //     const image = await fetch(originalImage);

    //     //Split image name
    //     // const nameSplit=originalImage.split("/");
    //     // const duplicateName=nameSplit.pop();

    //     const imageBlog = await image.blob()
    //     const imageURL = URL.createObjectURL(imageBlog)
    //     const link = document.createElement('a')
    //     link.href = imageURL;
    //     link.download = "image.jpg";
    //     document.body.appendChild(link)
    //     link.click()
    //     document.body.removeChild(link)  
    //    };

    const downloadJpg = (e) => {
        saveAs(`https://www.dronexvision.pl/sites/default/files/gallery/drone-x-vision-zdjecie-z-powietrza-jeziora-mazurskie-1000x667.jpg`, "pretty image.jpg");
    }

    return (
        <>
            <Filterimages {...filterProps} />
            {filtered.length &&
                <main className='images-container'>
                    {filtered.map((item) => (
                        <div className='przekroczenie' key={item.id}>
                            <div className='img-section'>
                                <img className='top-content' src={`${item.zdjecie}`} alt=":(" height={150} />
                                {/* <a href={`${item.zdjecie}`} download target="zdj.jpg"> */}
                                <button onClick={downloadJpg}>Pobierz zdjęcie</button>
                                {/* </a> */}
                            </div>
                            <div className='img-section'>
                                <div className='top-content'>
                                    <p><strong>Trasa: </strong>{item.trasa}</p>
                                    <p><strong>Data planowa: </strong>{item.timestamp.slice(0, 16).replace('T', ' ')}</p>
                                    <p><strong>Długość geo: </strong>{item.dlugosc_geo}</p>
                                    <p><strong>Szerokość geo: </strong>{item.szerokosc_geo}</p>
                                    {measurements.map((elem, key) => (
                                        <p key={key}><strong>{elem}: </strong>{item[elem]}</p>
                                    ))}

                                    <p><strong>Przekroczenie: </strong>{item.przekroczenie}</p>
                                </div>
                                <CSVLink data={[item]} filename={"przekroczenia.csv"}>
                                    <button>Pobierz dane</button>
                                </CSVLink>

                            </div>
                        </div>
                    ))}

                </main>
            }
        </>
    );
}

export default Zdjecie;
