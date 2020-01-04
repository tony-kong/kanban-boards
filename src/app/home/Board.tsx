import {
    Grid, Paper,
} from '@material-ui/core';
import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {BoardProps} from './BoardContainer';
import {BoardUseStyles} from './BoardStyles';
import {CardColumn} from './CardColumn';
import {IColumn} from './duck/types';

export const Board: React.FC<BoardProps> = (props: BoardProps) => {
    const classes = BoardUseStyles();
    const onDragEnd = (result: any) => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
            props.onMoveCard(source.droppableId, destination.droppableId, source.index, destination.index);
        }
    };

    return (
        <Paper className={classes.BoardContainer}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container className={classes.BoardGridColumnsContainer} spacing={3}>
                    {
                        props.columns.map((column: IColumn) =>
                            <Grid key={column.id} item className={classes.BoardColumnContainer}>
                                <CardColumn {...column}/>
                            </Grid>)
                    }
                </Grid>
            </DragDropContext>
        </Paper>
    );
};
