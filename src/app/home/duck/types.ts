import {AnyAction} from 'redux';

export interface IHomeActionTypes {
    MOVE_CARD: string;
    CREATE_CARD: string;
    CREATE_BOARD: string;
    CHANGE_BOARD: string;
}

export interface IHomeActionCreators {
    moveCard: (src: string, dst: string, srcIndex: number, dstIndex: number) => AnyAction;
    createCard: (columnId: string, title: string, description: string) => AnyAction;
    createBoard: (title: string) => AnyAction;
    changeBoard: (boardId: string) => AnyAction;
}

export interface ICard {
    id: string;
    title: string;
    description: string;
}

export interface IColumn {
    cards: ICard[];
    title: string;
    id: string;
}

export interface IBoard {
    columns: Map<string, IColumn>;
    title: string;
    id: string;
}

export interface IHomeState {
    boards: Map<string, IBoard>;
    currentBoardId: string;
}
