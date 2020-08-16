import React from 'react';
import {Provider} from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard'
import { ConnectedTaskList } from './TaskList'
import {Router, Route} from 'react-router-dom'
import {history} from '../store/history';
import { ConnectedNavigation } from './Navigation'
import { ConnectedTaskDetail } from './TaskDetail'

const RouteGuard = Component => ({match}) => {
    console.info("route guard ", match);
    return <Component match={match}/>
}
    
    
export const Main = () => (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation />
                {/*Make dashbboard only appear if the route has /dashboard */}
                <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)}/>
                <Route exact
                       path="/tasks/:id"
                       render = {RouteGuard(ConnectedTaskDetail)}/>
            </div>

        </Provider>
    </Router>
)