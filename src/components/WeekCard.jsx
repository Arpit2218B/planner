import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Card.css';
import { db } from '../firebase';
import { getWeekIndex } from '../utils';
import { CircularProgress } from '@material-ui/core';
import Loading from './Loading';
import EmptyCard from './EmptyCard';

const WeekCard = () => {

    const userId = localStorage.getItem('userId');

    const [ data, setData ] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        db.collection('user').doc(userId).collection('week').doc(getWeekIndex())
        .get()
        .then(doc => {
            const data = doc.data().data;
            if(data == undefined)
                data = [];
            setData(data);
            setLoading(false);
        })
        .catch(err => {setData([]); setLoading(false)})
    }, []);

    return (
        <Card>
            <h2>Weekly Tasks</h2>
            {data.map(task => (
                <div className="weekTaskData">
                    <h4>{task.task}</h4>
                    {task.subtask.length > 0 ? (
                        <ul>
                            {task.subtask.map((subTask) => (<li>{subTask}</li>))}
                        </ul>
                    ) : null}
                </div>
            ))}
            {loading ? (
                <Loading />
            ) : null}
            {data.length == 0 && !loading ? (
                <EmptyCard type="week" />
            ) : null}            
        </Card>
    );
}

export default WeekCard;