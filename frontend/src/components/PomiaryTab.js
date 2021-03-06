import React, { useEffect, useState, useContext } from 'react';
import '../styles/PomiaryTab.scss'
import Pomiaryfiltry from './PomiaryFiltry';
import axiosInstance from '../axios.js';
import XLSX from 'xlsx';
import { CSVLink } from "react-csv";


const Pomiarytab = () => {
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [path, setPath] = useState('');
    const [issueNumber, setIssueNumber] = useState('');
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(0);
    const [measure, setMeasure] = useState('');
    const [val, setIfVal] = useState('');

    const filterProps = {
        setDateFrom: setDateFrom,
        setDateTo: setDateTo,
        setPath: setPath,
        setIssueNumber: setIssueNumber,
        setLow: setLow,
        setHigh: setHigh,
        setMeasure: setMeasure,
        setIfVal: setIfVal
    }

    const [pomiary, setPomiary] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [toDownload, setToDownload] = useState([]);
    const [ids, setIds] = useState([]);
    const [temp, setTemp] = useState(0);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);
    const [condition, setCondition] = useState('');


    // useEffect(() => {
    //     let condition = []
    //     if (low) condition.push('elem.wartosc > low')
    //     if (high) condition.push('elem.wartosc < high')
    //     if (dateFrom) condition.push('Date.parse(elem.timestamp) > Date.parse(dateFrom)')
    //     if (dateTo) condition.push('Date.parse(elem.timestamp) < Date.parse(dateTo)')
    //     if (issueNumber) condition.push('elem.id == issueNumber')
    //     if (path) condition.push('elem.trasa == path')

    //     if (condition.length) {
    //         let filtersApplied = pomiary.filter(elem => {
    //             return eval(condition.join(' & '))
    //         })
    //         setFiltered(filtersApplied)
    //     } else {
    //         setFiltered(pomiary)
    //     }
    // }, [dateFrom, dateTo, path, issueNumber, low, high]);

    useEffect(() => {
        const fetchAndSet = async () => {
            let url = `pomiary?page=${page}`
            if (condition) url += `&${condition}`
            const data = await axiosInstance.get(url)
            console.log(data)
            setPrev(data.data.previous)
            setNext(data.data.next)
            setMaxPages(Math.ceil(data.data.count / 5))
            const tabData = data.data.results
            // console.log(data.data.results)
            tabData.sort((a, b) => (a.id > b.id) ? 1 : -1)
            setPomiary(tabData)
            setFiltered(tabData)
            setToDownload(tabData)
        }
        fetchAndSet()
    }, [page, condition])

    const downloadJson = async () => {
        const myData = toDownload
        const fileName = "pomiary";
        const json = JSON.stringify(myData);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const downloadXls = () => {
        let ws = XLSX.utils.json_to_sheet(toDownload);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "sheet");
        let buf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' }); // generate a nodejs buffer
        let str = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }); // generate a binary string in web browser
        XLSX.writeFile(wb, `pomiary.xlsx`);
    }

    const selectRow = (e) => {
        e.currentTarget.classList.toggle('selected-row')
        // console.log(parseInt(e.currentTarget.children[0].innerText))
        const id = parseInt(e.currentTarget.children[0].innerText)
        if (ids.includes(id)) {
            let changedIds = ids
            const index = ids.indexOf(id)
            changedIds.splice(index, 1)
            // delete changedIds[index]
            // changedIds.reverse()
            setIds(changedIds)
            setTemp(temp + 1)
        } else {
            setIds([...ids, id])
            setTemp(temp + 1)
        }
    }

    useEffect(() => {
        // console.log(ids)
        if (ids.length > 0) {
            const newFiltered = filtered.filter(elem => {
                return ids.includes(parseInt(elem.id))
            })
            setToDownload(newFiltered)
            // console.log(newFiltered)
        } else {
            setToDownload(pomiary)
        }
    }, [temp])

    const filterByClick = async () => {
        let condition = []
        const mapper = {
            'Tak': 'true',
            'Nie': 'false'
        }
        if (measure) condition.push(`mierzona_wielkosc=${measure}`)
        if (low) condition.push(`wartosc_from=${low}`)
        if (high) condition.push(`wartosc_to=${high}`)
        if (val) condition.push(`przekroczenie=${mapper[val]}`)
        if (dateFrom) condition.push(`timestamp_from=${dateFrom + ' 00:00'}`)
        if (dateTo) condition.push(`timestamp_to=${dateTo + ' 00:00'}`)
        if (issueNumber) condition.push(`zlecenie=${issueNumber}`)
        if (path) condition.push(`trasa=${path}`)

        // if (condition.length) {
        condition = condition.join('&')
        const data = await axiosInstance.get('pomiary?' + condition)
        const tabData = data.data.results
        tabData.sort((a, b) => (a.id > b.id) ? 1 : -1)
        setFiltered(tabData)
        setPage(1)
        setCondition(condition)
        setPrev(data.data.previous)
        setNext(data.data.next)
        setMaxPages(Math.ceil(data.data.count / 5))
        // } else {
        //     setFiltered(pomiary)
        // }
    }

    const resetFilters = () => {
        setFiltered(pomiary)
        const filters = ['#colt', '#cogt', '#wielkosc', '#przek', '#nr', '#trasa', '#datef', '#datet']
        filters.forEach(item => {
            let elem = document.querySelector(item)
            elem.value = ''
        })
        setDateFrom('')
        setDateTo('')
        setPath('')
        setIssueNumber('')
        setLow(0)
        setHigh(0)
        setMeasure('')
        setIfVal('')

        setCondition('')
        setPage(1)
    }
    const changePage = (num) => {
        console.log(page+num)
    }

    return (
        <main className='pomiary'>
            <Pomiaryfiltry {...filterProps} />
            <div className='btn-container'>
                <button className='filter-btn' onClick={resetFilters}>Reset filtr??w</button>
                <button className='filter-btn' onClick={filterByClick}>Filtruj</button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nr pomiaru</th>
                            <th>Trasa</th>
                            <th>timestamp</th>
                            <th>D??ugo???? geo</th>
                            <th>Szeroko???? geo</th>
                            <th>Wielko????</th>
                            <th>Warto????</th>
                            <th>Przekroczenie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(item => (
                            <tr key={item.id} onClick={selectRow}>
                                <td>{item.id}</td>
                                <td>{item.trasa}</td>
                                <td>{item.timestamp ? item.timestamp.slice(0, 10) : item.timestamp}</td>
                                <td>{item.dlugosc_geo}</td>
                                <td>{item.szerokosc_geo}</td>
                                <td>{item.mierzona_wielkosc}</td>
                                <td>{item.wartosc}</td>
                                <td>{item.czy_norma_przekroczona ? "Tak" : "Nie"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pages'>
                    {prev !== null ?
                        <button onClick={(e) => setPage(page-1)}>{'<'}</button>
                        :
                        <button className='blacked'>{'<'}</button>

                    }
                    <button className='outof'>{page}/{maxPages}</button>
                    {next !== null ?
                        <button onClick={(e) => setPage(page+1)}>{'>'}</button>
                        :
                        <button className='blacked'>{'>'}</button>
                    }
                </div>
                <div id='exports'>
                    <CSVLink data={filtered} filename={"pomiary.csv"}>
                        <button>Export CSV</button>
                    </CSVLink>
                    <button onClick={downloadXls}>Export XLSX</button>
                    <button onClick={downloadJson}>Export JSON</button>
                </div>
            </div>
        </main>
    );
}

export default Pomiarytab;
