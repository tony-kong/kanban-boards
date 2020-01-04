import {Grid, Paper} from '@material-ui/core';
import * as React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import {CardColumnUseStyles} from './BoardStyles';
import {CardToken} from './CardToken';
import {IColumn} from './duck/types';

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

export const CardColumn = (props: IColumn) => {
    const classes = CardColumnUseStyles();

    return <Droppable droppableId={props.id}>
        {(provided, snapshot) => (
            <React.Fragment>
                <div className={classes.ColumnTitle}>
                    {props.title}
                </div>
                <Paper className={classes.ColumnCardsContainer}
                       ref={provided.innerRef}
                       {...provided.droppableProps}
                       style={getListStyle(snapshot.isDraggingOver)}>
                    <Grid
                        container
                        direction={'column'}>
                        {props.cards.map((cardProps: any, index: number) => {
                            return <CardToken key={cardProps.id} index={index} {...cardProps} />;
                        })}
                        {provided.placeholder}
                    </Grid>
                </Paper>
            </React.Fragment>
        )}
    </Droppable>;
};
