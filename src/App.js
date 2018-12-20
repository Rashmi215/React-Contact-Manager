import React, { Component } from 'react';
import './App.css'
import Contacts from './components/Contacts';
import Header from './components/Header';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';
import About from './components/Pages/About';
import NotFound from './components/Pages/NotFound';
import { Provider } from './context';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <HashRouter>
          <div className="App">
            <Header branding = "Contact Manager" />
            <div className = "container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/About" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
