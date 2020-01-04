import {connect, ConnectedProps} from 'react-redux';
import {Board} from './Board';
import {homeOperations} from './duck';
import {IBoard, IColumn, IHomeState} from './duck/types';

const mapStateToProps = (state: any) => {
    const home: IHomeState = state.home;
    const board = home.boards.get(home.currentBoardId) as IBoard;
    return { columns: Array.from(board.columns.values()) };
};

const mapDispatchToProps = (dispatch: any) => {
    const onMoveCard = (src: string, dst: string, srcIndex: number, dstIndex: number) =>
        dispatch(homeOperations.moveCard(src, dst, srcIndex, dstIndex));
    return {
        onMoveCard,
    };
};

const connector = connect(
    mapStateToProps,
    mapDispatchToProps,
);

type BoardPropsFromRedux = ConnectedProps<typeof connector>;

export type BoardProps = BoardPropsFromRedux & {
    columns: IColumn[];
};
export default connector(Board);
