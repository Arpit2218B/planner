import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Card.css';
import { getDayIndex } from '../utils';
import { db } from '../firebase';
import { CircularProgress } from '@material-ui/core';

const LogCard = () => {

    const userId = localStorage.getItem('userId');

    const [log, setLog] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getLogData = () => {
        setLoading(true);
        db.collection('user').doc(userId).collection('notesLog').doc(getDayIndex())
            .get()
            .then(doc => {
                const data1 = doc.data().data;
                if(data1 == undefined)
                    data1 = [];
                setData(data1)
                setLoading(false);
            })
            .catch(err => {setData([]); setLoading(false);})
    }

    useEffect(() => {
        getLogData();
    }, []);

    const addLogHandler = () => {
        const tempLogList = [...data, log];
        db.collection('user').doc(userId).collection('notesLog').doc(getDayIndex()).set({data: tempLogList})
        .then(res => {
            setData(tempLogList);
            setLog('');
        })
        .catch(err => alert('Error adding log data'));
    }

    return (
        <Card full={true}>
            <h2>Logger for {getDayIndex()}</h2>
            <input value={log} onChange={(e) => setLog(e.target.value)} />
            <button onClick={addLogHandler}>Add log</button>
            {data.map((dat, index) => (
                <div>
                    <h4>Hour {index + 1}</h4>
                    <p>{dat}</p>
                </div>     
            ))}
            {loading ? (
                <CircularProgress />
            ) : null}
            {data.length == 0 && !loading ? (
                <h1>No data added</h1>
            ) : null}
        </Card>
    );
}

export default LogCard;