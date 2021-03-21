import React, { useEffect, useState } from 'react';
import Card from './Card';
import '../styles/Card.css';
import { db } from '../firebase';
import { getDayIndex, getWeekIndex } from '../utils';

const DayCard = () => {

    const today = new Date();
    const date = today.toDateString();

    const [ data, setData ] = useState([]);

    useEffect(() => {
        db.collection('user').doc('arpit').collection('day').doc(getDayIndex())
        .get()
        .then(doc => {
            const data = doc.data().data;
            if(data == undefined)
                data = [];
            setData(data);
        })
        .catch(err => setData([]))
    }, [])

    return (
        <Card>
            <h2>{date}</h2>
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
        </Card>
    );
}

export default DayCard;