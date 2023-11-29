import * as React from 'react'
import { CssBaseline } from '@mui/material';

import Navbar from './Navbar';

import Home from './Home';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import Explore from './Explore';
import NotFound from './NotFound';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './store';

const store = createStore(rootReducer)

function App() {

  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>

          <Route path = "/create">
            <Create />
          </Route>

          <Route path = "/explore">
            <Explore/>
          </Route>
          <Route path = "/blogs/:id">
            <BlogDetails />
          </Route>
          <Route path = "*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
    </React.Fragment>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
