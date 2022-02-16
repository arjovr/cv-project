import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


class GeneralInfo extends React.Component {
    constructor(props) {
        super(props)

        const firstName = localStorage.getItem('first_name') || ''
        const lastName = localStorage.getItem('last_name') || ''

        this.state = {
            firstName,
            lastName,
            editMode: false,
        }
    }

    onClick = () => {
        if (this.state.editMode) {
            //save
            localStorage.setItem('first_name', this.state.firstName)
            localStorage.setItem('last_name', this.state.lastName)
        }
        this.setState({
            editMode: !this.state.editMode
        })
    }

    onChangeFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    render = () => {
        return (
            <div>
                <div> <b>First Name: </b>{this.state.editMode ? <input value={this.state.firstName} onChange={this.onChangeFirstName}></input> : this.state.firstName}</div>
                <div> <b>Last Name: </b>{this.state.editMode ? <input value={this.state.lastName} onChange={this.onChangeLastName}></input> : this.state.lastName}</div>
                <div><button onClick={this.onClick}> <FontAwesomeIcon icon={this.state.editMode ? faFloppyDisk : faPencilAlt} /> {this.state.editMode ? 'Save' : 'Edit'}</button></div>
            </div>
        )
    }
}

export { GeneralInfo }
