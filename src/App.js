import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import configureStore from './Store/index'
import TodoList from "./Containers/todoList";
import CaseDetails from "./Containers/caseDetails";
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path='/' component={TodoList}/>
              <Route exact path='/items/' component={CaseDetails}/>
              <Route path='/items/:id' component={CaseDetails}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
