import {connect, ConnectedProps} from 'react-redux';
import {homeOperations} from './duck';
import {IBoard, IHomeState} from './duck/types';
import Main from './Main';

const mapStateToProps = (state: any) => {
    const home: IHomeState = state.home;
    return {
        boards: Array.from(home.boards.values()),
        currentBoardProps: home.boards.get(home.currentBoardId) as IBoard,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    const createBoard = (title: string) =>
        dispatch(homeOperations.createBoard(title));
    const createCard = (columnId: string, title: string, description: string) => {
        dispatch(homeOperations.createCard(columnId, title, description));
    };
    const changeBoard = (boardId: string) =>
        dispatch(homeOperations.changeBoard(boardId));
    return {
        createBoard,
        createCard,
        changeBoard,
    };
};

const connector = connect(
    mapStateToProps,
    mapDispatchToProps,
);

type MainPropsFromRedux = ConnectedProps<typeof connector>;

export type MainProps = MainPropsFromRedux & {
    boards: IBoard[];
    currentBoardProps: IBoard,
};
export default connector(Main);
