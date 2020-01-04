import {Card, CardContent, CardHeader} from '@material-ui/core';
import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {ICard} from './duck/types';

const getCardStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: '8px',
    margin: `0 0 4px 0`,
    background: isDragging ? 'lightblue' : 'white',
    ...draggableStyle,
});

export const CardToken = (props: ICard & { index: number }) => {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided, snapshot) => (
                <Card
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getCardStyle(snapshot.isDragging, provided.draggableProps.style)}
                    ref={provided.innerRef}
                >
                    <CardHeader title={props.title}/>
                    <CardContent>
                        {props.description}
                    </CardContent>
                </Card>
            )}
        </Draggable>
    );
};
