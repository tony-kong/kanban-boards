import {
    AppBar,
    Button, CssBaseline,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, Divider, Drawer,
    FormControl, IconButton,
    InputLabel, List, ListItem, ListItemText,
    Select,
    TextField, Toolbar, Typography, useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import BoardContainer from './BoardContainer';
import {MainProps} from './MainContainer';
import {useStyles} from './MainStyles';

const CreateCardDialog = (props: MainProps) => {
    const [state, setState] = React.useState({
        open: false,
        columnId: props.currentBoardProps.columns.keys().next().value,
        title: '',
        description: '',
    });

    const handleClickOpen = () => {
        setState({
            ...state,
            open: true,
            columnId: props.currentBoardProps.columns.keys().next().value,
            title: '',
            description: '',
        });
    };

    const handleColumnChange = (event: any) => {
        setState({
            ...state,
            columnId: event.target.value,
        });
    };

    const handleTitleChange = (event: any) => {
        setState({
            ...state,
            title: event.target.value,
        });
    };

    const handleDescChange = (event: any) => {
        setState({
            ...state,
            description: event.target.value,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    const handleCreate = () => {
        props.createCard(state.columnId, state.title, state.description);
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <div style={{marginLeft: 'auto'}}>
            <Button variant='contained' color='primary' onClick={handleClickOpen}>
                Create a Card
            </Button>
            <Dialog open={state.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Create Card</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel>Column</InputLabel>
                        <Select
                            native
                            value={state.columnId}
                            onChange={handleColumnChange}
                            inputProps={{
                                name: 'Column',
                            }}
                        >
                            {
                                Array.from(props.currentBoardProps.columns, ([key, column]) =>
                                    <option key={key} value={key}> {column.title} </option>)
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Title'
                        type='Title'
                        fullWidth
                        onChange={handleTitleChange}
                    />
                    <TextField
                        label='Description'
                        multiline
                        rows='4'
                        variant='outlined'
                        onChange={handleDescChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='default'>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color='default'>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const CreateBoardDialog = (props: MainProps) => {
    const [state, setState] = React.useState({
        open: false,
        title: '',
    });

    const handleClickOpen = () => {
        setState({
            ...state,
            open: true,
        });
    };

    const handleTitleChange = (event: any) => {
        setState({
            ...state,
            title: event.target.value,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    const handleCreate = () => {
        props.createBoard(state.title);
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <div style={{marginLeft: 'auto'}}>
            <Button variant='contained' color='primary' onClick={handleClickOpen}>
                Create a Board
            </Button>
            <Dialog open={state.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Create Board</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Title'
                        type='Title'
                        fullWidth
                        onChange={handleTitleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='default'>
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color='default'>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const Main = (props: MainProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position='fixed'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerOpen}
                        edge='start'
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' noWrap>
                        {props.currentBoardProps.title}
                    </Typography>
                    <CreateCardDialog {...props}/>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <CreateBoardDialog {...props}/>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    {props.boards.map((board) => (
                        <ListItem button key={board.id} onClick={() => props.changeBoard(board.id)}>
                            <ListItemText primary={board.title}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>
                <BoardContainer/>
            </main>
        </div>
    );
};

export default Main;
