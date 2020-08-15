import React from 'react';
import {Provider} from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard'
import { ConnectedTaskList } from './TaskList'
import {Router, Route} from 'react-router-dom'
import {history} from '../store/history';
import { ConnectedNavigation } from './Navigation'

export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                {/*Make dashbboard only appear if the route has /dashboard */}
                <Route exact path="/dashboard" render={() => (<ConnectedDashboard/>)}/>
            
            </div>

        </Provider>
    </Router>
)