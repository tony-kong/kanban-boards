import {AnyAction} from 'redux';
import {createReducer} from 'reduxsauce';
import { v4 as uuid } from 'uuid';
import {Types} from './actions';
import {IBoard, IColumn, IHomeState} from './types';

export const INITIAL_STATE: IHomeState = {boards: new Map<string, IBoard>(), currentBoardId: ''};

export const moveCard = (state = INITIAL_STATE, action: AnyAction) => {
    const {src, srcIndex, dst, dstIndex} = action;
    const currentBoard = {...state.boards.get(state.currentBoardId)} as IBoard;
    const newColumnsMap = new Map(currentBoard.columns);
    const srcColumn = newColumnsMap.get(src);

    if (srcColumn) {
        const newSrcColumn = {...srcColumn};
        newColumnsMap.set(src, newSrcColumn);
        const [cardToMove] = newSrcColumn.cards.splice(srcIndex, 1);
        let newDstColumn;
        if (src === dst) {
            newDstColumn = newSrcColumn;
        } else {
            newDstColumn = {...newColumnsMap.get(dst)};
            newColumnsMap.set(dst, newDstColumn as IColumn);
        }
        newDstColumn.cards && newDstColumn.cards.splice(dstIndex, 0, cardToMove);

        return {...state, columns: newColumnsMap};
    }
};

export const createCard = (state = INITIAL_STATE, action: AnyAction) => {
    const {columnId, title, description} = action;
    const currentBoard = {...state.boards.get(state.currentBoardId)} as IBoard;
    const newColumns = new Map(currentBoard.columns);
    const newColumn = {...newColumns.get(columnId)} as IColumn;
    const newColumnCards = newColumn.cards;
    newColumnCards.push({id: uuid(), title, description});
    newColumns.set(columnId, newColumn);
    return {...state, columns: newColumns};
};

export const createBoard = (state = INITIAL_STATE, action: AnyAction) => {
    const todoColumn = {
        cards: [],
        title: 'Todo',
        id: uuid(),
    };
    const inProgressColumn = {
        cards: [],
        title: 'In Progress',
        id: uuid(),
    };
    const doneColumn = {
        cards: [],
        title: 'Done',
        id: uuid(),
    };
    const newBoard: IBoard = {
        columns: new Map<string, IColumn>([[todoColumn.id, todoColumn], [inProgressColumn.id, inProgressColumn],
            [doneColumn.id, doneColumn]]),
        title: action.title,
        id: uuid(),
    };

    const newBoards = new Map(state.boards);
    newBoards.set(newBoard.id, newBoard);
    return {...state, boards: newBoards};
};

export const changeBoard = (state = INITIAL_STATE, action: AnyAction) => {
    return {...state, currentBoardId: action.boardId};
};

export const HANDLERS = {
    [Types.MOVE_CARD]: moveCard,
    [Types.CREATE_CARD]: createCard,
    [Types.CREATE_BOARD]: createBoard,
    [Types.CHANGE_BOARD]: changeBoard,
};

export default createReducer(INITIAL_STATE, HANDLERS);
