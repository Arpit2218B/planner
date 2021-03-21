import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Card.css';
import { getDayIndex } from '../utils';
import { db } from '../firebase';

const LogCard = () => {

    const [log, setLog] = useState('');
    const [data, setData] = useState([]);

    const getLogData = () => {
        db.collection('user').doc('arpit').collection('notesLog').doc(getDayIndex())
            .get()
            .then(doc => {
                const data1 = doc.data().data;
                if(data1 == undefined)
                    data1 = [];
                setData(data1)
            })
            .catch(err => setData([]))
    }

    useEffect(() => {
        getLogData();
    }, []);

    const addLogHandler = () => {
        const tempLogList = [...data, log];
        db.collection('user').doc('arpit').collection('notesLog').doc(getDayIndex()).set({data: tempLogList})
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
        </Card>
    );
}

export default LogCard;