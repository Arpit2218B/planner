import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Card.css';
import { getDayIndex } from '../utils';
import { db } from '../firebase';
import { CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Loading from './Loading';
import EmptyCard from './EmptyCard';

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

    const changeHandler = (e) => {
        if(e.keyCode === 13) {
            addLogHandler();
            return;
        }
        setLog(e.target.value)
    }

    const addLogHandler = () => {
        if(log.length == 0)
            return;
        const tempLogList = [...data, log];
        db.collection('user').doc(userId).collection('notesLog').doc(getDayIndex()).set({data: tempLogList})
        .then(res => {
            setData(tempLogList);
            setLog('');
        })
        .catch(err => alert('Error adding log data'));
    }

    const deleteLogHandler = (index) => {
        let tempLogList = [...data];
        tempLogList.splice(index, 1);
        console.log(index);
        console.log(tempLogList);
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
            <div className="log__inputForm">
                <input placeholder="Enter tasks to log" value={log} onChange={(e) => changeHandler(e)} onKeyUp={(e) => changeHandler(e)} />
                <button onClick={addLogHandler}>Add log</button>
            </div>
            <div className="log__container  heading">
                    <h4>Hour</h4>
                    <p>Activity</p>
                </div>
            {data.map((dat, index) => (
                <div className="log__container">
                    <h4>Hour {index + 1}</h4>
                    <p>{dat}</p>
                    <span className="delete__log" onClick={() => deleteLogHandler(index)}><Delete /></span>
                </div>     
            ))}
            {loading ? (
                <Loading />
            ) : null}
            {data.length == 0 && !loading ? (
                <EmptyCard />
            ) : null}
        </Card>
    );
}

export default LogCard;