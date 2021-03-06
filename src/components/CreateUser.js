import React, { Component } from 'react'
import Axios from 'axios';

export default class CreateUser extends Component {

    state = {
        users: [],
        username: ''
    }
    
    async componentDidMount(){
        this.getUsers();                
    }

    onChangeUsername = (e) => {        
        this.setState({
            username: e.target.value
        });
    }

    onSubmitUsername = async (e) => {
        e.preventDefault();

        await Axios.post('http://localhost:4000/api/users', { 
            username: this.state.username
        });

        this.setState({ username: '' });
        this.getUsers();
    }

    getUsers = async () => {
        const res = await Axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }

    deleteUserOnDobuleClick = async (id) => {
        await Axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3> Crear nuevo usuario </h3>
                        <form onSubmit={this.onSubmitUsername}>
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.username } onChange={this.onChangeUsername}/>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                    <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={ () => this.deleteUserOnDobuleClick(user._id) }>
                                        { user.username }
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
