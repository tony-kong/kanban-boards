import {makeStyles} from '@material-ui/core';

export const CardColumnUseStyles = makeStyles({
    ColumnTitle: {
        fontFamily: 'Verdana',
        paddingBottom: '8px',
    },
    ColumnCardsContainer: {
        padding: '8px',
        backgroundColor: 'lightGrey',
        height: '100%',
        minWidth: '130px',
        overflowY: 'auto',
    },
});

export const BoardUseStyles = makeStyles({
    BoardContainer: {
        height: 'calc(100% - 64px)',
        display: 'flex',
    },
    BoardColumnContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    BoardGridColumnsContainer: {
        height: undefined,
        width: undefined,
        margin: 0,
    },
});
