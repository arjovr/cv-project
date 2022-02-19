import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faFloppyDisk, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import uniqid from 'uniqid';

const Educations = () => {
    let _educations = localStorage.getItem('educations') || '[]'
    _educations = JSON.parse(_educations)

    const [educations, setEducations] = useState(_educations)
    const [dirty, setDirty] = useState(false)



    const onAddClick = () => {
        const newEducations = [...educations]
        newEducations.push({
            id: uniqid(),
            name: '',
            title: '',
            date: '',
            editMode: true,
        })
        setDirty(true)
        setEducations(newEducations)
    }

    const save = () => {
        localStorage.setItem('educations', JSON.stringify(educations))
        setDirty(false)
    }

    const update = (id, newObj) => {
        const newEducations = educations.map(x => {
            if (x.id === id) {
                return { id, ...newObj }
            }
            return x
        })
        setDirty(true)
        setEducations(newEducations)
    }

    const _delete = (id) => {
        const newEducations = educations.filter(x => x.id !== id)
        setDirty(true)
        setEducations(newEducations)
    }


    return (
        <div>
            <div>
                {educations.map((x) =>
                    <Education key={x.id} id={x.id} name={x.name} title={x.title} date={x.date}
                        delete={_delete}
                        update={update} />)}
            </div>
            <div>
                <button onClick={onAddClick} > <FontAwesomeIcon icon={faPlusCircle} /> Add</button>
                {dirty ? <button onClick={save}> <FontAwesomeIcon icon={faFloppyDisk} /> Save</button> : ''}
            </div>
        </div >
    )
}


const Education = (props) => {

    const [editMode, setEditMode] = useState(props.editMode || false)
    const [title, setTitle] = useState(props.title)
    const [name, setName] = useState(props.name)
    const [date, setDate] = useState(props.date)

    const onClick = () => {
        if (editMode) {
            props.update(props.id, {
                name,
                title,
                date,
            })
        }
        setEditMode(!editMode)

    }

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const onDateChange = (e) => {
        setDate(e.target.value)
    }

    const onDelete = () => {
        props.delete(props.id)
    }

    return (
        <div>
            <div><b>Name: </b> {editMode ? <input value={name} onChange={onNameChange} /> : name}</div>
            <div><b>Title: </b> {editMode ? <input value={title} onChange={onTitleChange} /> : title}</div>
            <div><b>Date: </b> {editMode ? <input type="date" value={date} onChange={onDateChange} /> : date}</div>
            <div>
                <button onClick={onClick}>
                    <FontAwesomeIcon icon={editMode ? faFloppyDisk : faPencilAlt} /> {editMode ? 'Save' : 'Edit'}
                </button>
                <button onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    )
}

export { Educations }
