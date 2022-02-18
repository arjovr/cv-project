import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


const GeneralInfo = (props) => {

    const _firstName = localStorage.getItem('first_name') || ''
    const _lastName = localStorage.getItem('last_name') || ''

    const [firstName, setFirstName] = useState(_firstName)
    const [lastName, setLastName] = useState(_lastName)
    const [editMode, setEditMode] = useState(false)

    const onClick = () => {
        if (editMode) {
            //save
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)
        }
        setEditMode(!editMode)
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    return (
        <div>
            <div> <b>First Name: </b>{editMode ? <input value={firstName} onChange={onChangeFirstName}></input> : firstName}</div>
            <div> <b>Last Name: </b>{editMode ? <input value={lastName} onChange={onChangeLastName}></input> : lastName}</div>
            <div><button onClick={onClick}> <FontAwesomeIcon icon={editMode ? faFloppyDisk : faPencilAlt} /> {editMode ? 'Save' : 'Edit'}</button></div>
        </div>
    )
}

export { GeneralInfo }
