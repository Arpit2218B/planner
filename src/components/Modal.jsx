import { Input } from '@material-ui/core';
import { Close, CloseOutlined, CloudCircle } from '@material-ui/icons';
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

const ModalBody = ({ children, type, now }) => {

    const userId = localStorage.getItem('userId');

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
    const [currentDay, setCurrentDay] = useState(now);

    useEffect(() => {
        if(type == 'week') {
            db.collection('user').doc(userId).collection('week').doc(getWeekIndex(!currentDay))
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
            db.collection('user').doc(userId).collection('day').doc(getDayIndex(!currentDay))
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
            db.collection('user').doc(userId).collection('week').doc(getWeekIndex(!currentDay)).set({data: data})
            .then(res => {alert('Data added')})
            .catch(err => alert('Error adding data'))
            .finally(() => setShowModal(false))
        }
        else {
            db.collection('user').doc(userId).collection('day').doc(getDayIndex(!currentDay)).set({data: data})
            .then(res => {alert('Data added')})
            .catch(err => alert('Error adding data'))
            .finally(() => setShowModal(false))
        }
    }

    const Modal = (
        <div className="modal" onClick={(e) => close(true, e)}>
            <div className="modal__popup" onClick={(e) => close(false, e)}>
                <div className="modal__close">
                    <CloseOutlined fontSize="large"  onClick={() => setShowModal(false)} />
                </div>
                <h2>{task === 'week' ? 'Add weekly tasks' : 'Add daily tasks'}</h2>
                <span>(used to add current/next {type} tasks)</span>
                <div className="modal__controls">
                    <input type="checkbox" checked={currentDay} value={currentDay} onChange={() => setCurrentDay(!currentDay)} />
                    <span>Current {type}</span>
                </div>
                <textarea rows={20} placeholder={placeHolder} value={subTask} onChange={(e) => setSubTask(e.target.value)}></textarea>
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