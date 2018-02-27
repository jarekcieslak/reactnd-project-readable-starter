import React from "react";
import {fetchPostDetails, votePost} from "../api/Api";
import {connect} from "react-redux";
import {Button, CardMedia, Divider, Grid, IconButton, Menu, MenuItem, Paper, Typography, withStyles} from "material-ui";
import {withRouter} from "react-router";
import {ThumbDown, ThumbUp} from "material-ui-icons";
import DateFormat from "../shared/Date/Date";
import MoreVertIcon from "material-ui-icons/MoreVert";
import ErrorMessage from "../shared/ErrorMessage/ErrorMessage";
import PostComments from "./comments/PostComments";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";


const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: 20
    },
    media: {
        height: 400,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: 140,
        width: 100,
    },
});


class PostDetails extends React.Component {
    state = {
        menuAnchorEl: null,
    };

    handleMenuOpen = event => {
        this.setState({menuAnchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({menuAnchorEl: null});
    };

    componentDidMount() {
        const postId = this.props.match.params.id;
        this.props.dispatch(fetchPostDetails(postId));
    }

    votePost = (postId, isUpVote) => {
        this.props.dispatch(votePost(postId, isUpVote));
    };

    render() {
        const {classes, details, status} = this.props;
        const {menuAnchorEl} = this.state;

        return (
            <div>
                {status === 'ok' &&
                <div>
                    <Grid container justify="center" spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.root} elevation={4}>
                                <CardMedia
                                    className={classes.media}
                                    image={"https://picsum.photos/800/200/?image=" + Math.floor(Math.random() * 100)}
                                    title="Contemplative Reptile"
                                />
                                <br/>
                                <Typography variant="display2" component="h1">{details.title}</Typography>
                                <Typography component="p"><DateFormat
                                    time={details.timestamp}/> ~<strong>{details.author}</strong></Typography>
                                <br/>
                                <Typography variant="subheading" component="p">{details.body}</Typography>
                                <br/>
                                <Divider></Divider>
                                <Button size="small" color="default">Likes: {details.voteScore}</Button>
                                <Button onClick={() => this.votePost(details.id, true)} size="small"
                                        color="default"><ThumbUp/></Button>
                                <Button onClick={() => this.votePost(details.id, false)} size="small"
                                        color="default"><ThumbDown/></Button>
                                <span>Comments: {details.commentCount}</span>
                                <IconButton
                                    aria-label="More"
                                    aria-owns={menuAnchorEl ? 'simple-menu' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl)}
                                    onClose={this.handleMenuClose}>
                                    <MenuItem onClick={this.handleMenuClose}>Edit post</MenuItem>
                                    <MenuItem onClick={this.handleMenuClose}>Delete post</MenuItem>
                                </Menu>
                            </Paper>
                        </Grid>

                        <PostComments postId={details.id}> </PostComments>
                    </Grid>
                </div>}
                {status === 'loading' && <LoadingSpinner></LoadingSpinner>}
                {status === 'error' && <ErrorMessage what="post details"></ErrorMessage>}
            </div>)

    }
}

function mapStateToProps(state) {
    const slice = state.postDetails;
    return {
        status: slice.status,
        details: slice.data
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(PostDetails)));

