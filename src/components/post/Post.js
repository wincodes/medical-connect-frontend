import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../Loading'
import { getPost } from '../../actions/postActions'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentFeed from './CommentFeed'

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id)
	}

	render() {
		const { post, loading } = this.props.post
		let postContent

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Loading />
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comments} />
				</div>
			)
		}
		return (
			<div className='feed'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 m-auto'>
							<Link className='btn btn-light mb-4' to='/feed'>
								Back to Feeds
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
