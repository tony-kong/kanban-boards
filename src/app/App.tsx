import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import MainContainer from './home/MainContainer';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Route exact path='/' component={MainContainer}/>
                {/* Add all your remaining routes here, like /trending, /about, etc. */}
            </div>
        </Router>
    );
};

export default App;
