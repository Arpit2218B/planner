import { Input } from '@material-ui/core';
import { Close, CloudCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../styles/Modal.css';
import { getDayIndex, getWeekIndex } from '../utils';

const placeHolder = "Enter data in the following format - \n\n" + JSON.stringify([
    {
        task: "someTask",
        subtask: [
            "a",
            "b"
        ]
    },
    {
        task: "someTask",
        subtask: [
            "a",
            "b"
        ]
    }
], null, 4);

const ModalBody = ({ children, type }) => {

    const [ showModal, setShowModal ] = useState(false);

    const close = (action, e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        if(action) {
            setShowModal(false);
        }
    }

    const getHeading = () => {
        let t = '';
        if(type === 'week') {
            t = getWeekIndex(true);
        }
        else {
            t = getDayIndex(true);
        }
        return t;
    } 

    const [task, setTask] = useState(type);
    const [subTask, setSubTask] = useState(undefined);
    const [currentDay, setCurrentDay] = useState(false);

    useEffect(() => {
        if(type == 'week') {
            db.collection('user').doc('arpit').collection('week').doc(getWeekIndex(!currentDay))
            .get()
            .then(doc => {
                const data = doc.data().data;
                let str = JSON.stringify(data, null, 4);
                if(data == undefined)
                    str = '';
                setSubTask(str);
            })
            .catch(err => {
                // if(!subTask)
                setSubTask('')
            })
        }
        else {
            db.collection('user').doc('arpit').collection('day').doc(getDayIndex(!currentDay))
            .get()
            .then(doc => {
                const data = doc.data().data;
                let str = JSON.stringify(data, null, 4);
                if(data == undefined)
                    str = '';
                setSubTask(str);
            })
            .catch(err => {
                // if(!subTask)
                setSubTask('')
            })
        }
    }, [currentDay, showModal])

    const addHandler = () => {
        const data = JSON.parse(subTask);
        if(type === 'week') {
            db.collection('user').doc('arpit').collection('week').doc(getWeekIndex(!currentDay)).set({data: data})
            .then(res => {alert('Data added')})
            .catch(err => alert('Error adding data'))
        }
        else {
            db.collection('user').doc('arpit').collection('day').doc(getDayIndex(!currentDay)).set({data: data})
            .then(res => {alert('Data added')})
            .catch(err => alert('Error adding data'))
        }
    }

    const Modal = (
        <div className="modal" onClick={(e) => close(true, e)}>
            <div className="modal__popup" onClick={(e) => close(false, e)}>
                <input value={task}></input>
                <textarea rows={20} placeholder={placeHolder} value={subTask} onChange={(e) => setSubTask(e.target.value)}></textarea>
                <input type="checkbox" value={currentDay} onChange={() => setCurrentDay(!currentDay)} />
                <button onClick={addHandler}>Add Data</button>
            </div>
        </div>
    )

    return (
        <div>
            <span onClick={() => setShowModal(true)}>
                {children}
            </span>
            {showModal ? (
                Modal
            ) : null}
        </div>
    )
}

export default ModalBody;