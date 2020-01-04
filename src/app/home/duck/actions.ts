import {createActions} from 'reduxsauce';
import {IHomeActionCreators, IHomeActionTypes} from './types';

const {Creators, Types} = createActions<IHomeActionTypes, IHomeActionCreators>({
    moveCard: ['src', 'dst', 'srcIndex', 'dstIndex'],
    createCard: ['columnId', 'title', 'description'],
    createBoard: ['title'],
    changeBoard: ['boardId'],
});

export {Creators, Types};
