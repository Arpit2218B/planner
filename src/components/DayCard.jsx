import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Card.css';
import { db } from '../firebase';
import { getDayIndex, getWeekIndex } from '../utils';
import { CircularProgress } from '@material-ui/core';
import Loading from './Loading';
import EmptyCard from './EmptyCard';

const DayCard = () => {

    const userId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(false);
    const today = new Date();
    const date = today.toDateString();

    const [ data, setData ] = useState([]);

    useEffect(() => {
        setLoading(true);
        db.collection('user').doc(userId).collection('day').doc(getDayIndex())
        .get()
        .then(doc => {
            const data = doc.data().data;
            if(data == undefined)
                data = [];
            setData(data);
            setLoading(false);
        })
        .catch(err => {setData([]); setLoading(false);})
    }, [])

    return (
        <Card>
            <h2>{date}</h2>
            {data.map(task => (
                <div className="weekTaskData">
                    <h4>{task.task}</h4>
                    {task?.subtask?.length > 0 ? (
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
                <EmptyCard type="day" />
            ) : null}       
        </Card>
    );
}

export default DayCard;