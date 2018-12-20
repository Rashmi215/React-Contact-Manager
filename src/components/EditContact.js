import React, {Component} from 'react';
import { Consumer } from '../context';
import TextInputGroup from './TextInputGroup';
import axios from 'axios';

class EditContact extends Component{
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount(){
    const {id} = this.props.match.params;
    const result = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = result.data;
    this.setState({
      name:  contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChangeField = (e) => this.setState({ [e.target.name] : e.target.value});

  onSubmit = async (dispatch, e) =>{
    e.preventDefault();
    const { name, email, phone } = this.state;

    //check for errors
    if(name === ''){
      this.setState({ errors: {name: 'Name is required'}});
      return;
    }
    if(email === ''){
      this.setState({ errors: {email: 'Email is required'}});
      return;
    }
    if(phone === ''){
      this.setState({ errors: {phone: 'Phone No is required'}});
      return;
    }
    const updateContact = {
      name: name,
      email: email,
      phone: phone
    }
    const { id } = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data});

    //clear the fields
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  render(){
    const {name, email, phone, errors} = this.state;

    return(
      <Consumer>
        {value => {
          const {dispatch} = value;
          return(
            <div className = "card mb-3">
              <div className = "card-header"><h4>Update Contact</h4> </div>
              <div className = "card-body">

                <form onSubmit = {this.onSubmit.bind(this, dispatch)}>
                   <TextInputGroup
                       label="Name"
                       name="name"
                       placeholder="Enter Name..."
                       value={name}
                       onChange={this.onChangeField}
                       error={errors.name}
                    />
                    <TextInputGroup
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter Email..."
                        value={email}
                        onChange={this.onChangeField}
                        error={errors.email}
                     />
                     <TextInputGroup
                         label="Phone"
                         name="phone"
                         placeholder="Enter Phone No..."
                         value={phone}
                         onChange={this.onChangeField}
                         error={errors.phone}
                      />
                  <input type = "submit" value = "Update Contact" className = "btn btn-dark btn-block"/>
                </form>

              </div>
            </div>
          );
        }}
      </Consumer>
    )

  }
}

export default EditContact;
