import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Post from '../Post';
import {
	getVisiblePosts,
	getIsFetching
} from '../../reducers';
import * as actions from '../../actions/posts';

class PostsList extends Component {
	// TODO: try nested Route for sort

	componentDidMount() {
		this.props.fetchPosts();
	}

	render() {
		const {
			posts,
			isFetching,
			incrementPostScore,
			decrementPostScore,
			deletePost,
			sortByVoteScore,
			sortByTimestamp,
		} = this.props;

		if (isFetching && !posts.length) {
			return <p>Loading posts...</p>;
		}

		return (
			<div>
				<div>
					Sort by:
					<button onClick={sortByVoteScore}>
						Vote Score
					</button>
					<button onClick={sortByTimestamp}>
						Recent
					</button>
				</div>
				<ul>
					{posts.map((post) => (
						<Post
							key={post.id}
							handleIncrement={incrementPostScore}
							handleDecrement={decrementPostScore}
							handleDelete={deletePost}
							{...post}
						/>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state, { match }) => {
	const category = match.params.category

	return {
		isFetching: getIsFetching(state),
		posts: getVisiblePosts(state, category)
	}
};

const mapDispatchToProps = {
	fetchPosts: actions.fetchPosts,
	incrementPostScore: actions.incrementPostScore,
	decrementPostScore: actions.decrementPostScore,
	deletePost: actions.deletePost,
	sortByVoteScore: actions.sortByVoteScore,
	sortByTimestamp: actions.sortByTimestamp
};

PostsList = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(PostsList));

export default PostsList;