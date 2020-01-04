import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {v4 as uuid} from 'uuid';
import App from './app/App';
import {IBoard, IColumn} from './app/home/duck/types';
import rootReducer from './reducers';
import * as serviceWorker from './serviceWorker';

const inProgressColumn = {
    cards: [
        {
            id: '0',
            title: 'Card0',
            description: 'Card0',
        },
        {
            id: '1',
            title: 'Card1',
            description: 'Card1',
        },

    ],
    title: 'In Progress',
    id: uuid(),
};

const doneColumn = {
    cards: [
        {
            id: '2',
            title: 'Card2',
            description: 'Card2',
        },
        {
            id: '3',
            title: 'Card3',
            description: 'Card3',
        },
    ],
    title: 'Done',
    id: uuid(),
};

const mockBoard: IBoard = {
    columns: new Map<string, IColumn>([[inProgressColumn.id, inProgressColumn], [doneColumn.id, doneColumn]]),
    title: 'TODO',
    id: uuid(),
};

const store = createStore(rootReducer, {
    home: {
        boards: new Map([[mockBoard.id, mockBoard]]),
        currentBoardId: mockBoard.id,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
