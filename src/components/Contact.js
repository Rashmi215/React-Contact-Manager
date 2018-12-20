import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component{
  state = {
    showContactInfo: false
  };

  showClick = () =>{
     this.setState({ showContactInfo : !this.state.showContactInfo });
  };

  deleteClick = async (id, dispatch) =>{
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id});
  }

  render(){
     const { id, name, email, phone } = this.props.contact;
     const { showContactInfo } = this.state;

     return(

        <Consumer>
          {value => {
            const {dispatch} = value;
            return(
              <div className = "card card-body mb-3">
                <h4>{ name }{' '}
                <i className = "fas fa-sort-down"
                   onClick = {this.showClick}
                   style = {{cursor:'pointer'}}>
                </i>
                <i className = "fas fa-trash fa-xs"
                   style = {{cursor:'pointer', float:'right', color:'#17A2B8'}}
                   onClick = {this.deleteClick.bind(this, id, dispatch)}>
                </i>
                <Link to={`/contact/edit/${id}`}>
                  <i className = "fas fa-pencil-alt fa-xs"
                     style = {{cursor:'pointer', float:'right', marginRight:'1rem', color:'black'}}>
                  </i>
                </Link>
                </h4>
                { showContactInfo ? (<ul className = "list-group">
                   <li className = "list-group-item">Email: { email }</li>
                   <li className = "list-group-item">Phone: { phone }</li>
                </ul>) : null}
              </div>
            );
          }}
        </Consumer>

     );
  }
}

Contact.propTypes = {
  contact:  PropTypes.object.isRequired,
};

export default Contact;
