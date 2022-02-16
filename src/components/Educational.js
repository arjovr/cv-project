import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faFloppyDisk, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import uniqid from 'uniqid';

class Educations extends React.Component {
    constructor() {
        super()

        let educations = localStorage.getItem('educations') || '[]'
        educations = JSON.parse(educations)

        this.state = {
            dirty: false,
            educations: educations
        }
    }

    onAddClick = () => {
        const newEducations = [...this.state.educations]
        newEducations.push({
            id: uniqid(),
            name: '',
            title: '',
            date: '',
            editMode: true,
        })
        this.setState({
            dirty: true,
            educations: newEducations
        })
    }

    save = () => {
        localStorage.setItem('educations', JSON.stringify(this.state.educations))
        this.setState({
            dirty: false
        })
    }

    update = (index, newObj) => {
        const newEducations = [...this.state.educations]
        newEducations[index] = newObj
        this.setState({
            dirty: true,
            educations: newEducations
        })
    }

    delete = (index) => {
        const newEducations = [...this.state.educations]
        newEducations.splice(index, 1)
        this.setState({
            dirty: true,
            educations: newEducations
        })
    }


    render = () => {
        return (
            <div>
                <div>
                    {this.state.educations.map((x, index) =>
                        <Education name={x.name} title={x.title} date={x.date}
                            delete={() => this.delete(index)}
                            update={(newObj) => this.update(index, newObj)} />)}
                </div>
                <div>
                    <button onClick={this.onAddClick} > <FontAwesomeIcon icon={faPlusCircle} /> Add</button>
                    {this.state.dirty ? <button onClick={this.save}> <FontAwesomeIcon icon={faFloppyDisk} /> Save</button> : ''}
                </div>
            </div >
        )
    }
}


class Education extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: props.editMode || false,
            title: props.title,
            name: props.name,
            date: props.date
        }
    }

    onClick = () => {
        if (this.state.editMode) {
            this.props.update(this.state)
        }
        this.setState({
            editMode: !this.state.editMode
        })

    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onDateChange = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    onDelete = () => {
        this.props.delete()
    }

    render = () => {
        return (
            <div key={this.props.id}>
                <div><b>Name: </b> {this.state.editMode ? <input value={this.state.name} onChange={this.onNameChange} /> : this.state.name}</div>
                <div><b>Title: </b> {this.state.editMode ? <input value={this.state.title} onChange={this.onTitleChange} /> : this.state.title}</div>
                <div><b>Date: </b> {this.state.editMode ? <input type="date" value={this.state.date} onChange={this.onDateChange} /> : this.state.date}</div>
                <div>
                    <button onClick={this.onClick}>
                        <FontAwesomeIcon icon={this.state.editMode ? faFloppyDisk : faPencilAlt} /> {this.state.editMode ? 'Save' : 'Edit'}
                    </button>
                    <button onClick={this.onDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        )
    }
}

export { Educations }
