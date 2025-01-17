import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'

class PostItem extends Component {
	onDeleteClick(id) {
		this.props.deletePost(id)
	}

	onLikeClick(id) {
		this.props.addLike(id)
	}

	onUnlikeClick(id) {
		this.props.removeLike(id)
	}

	findUserLikes(likes) {
		const { auth } = this.props
		if (likes.filter(like => (like.user = auth.user.id)).length > 0) {
			return true
		} else {
			return false
		}
	}

	render() {
		const { post, auth, showActions } = this.props
		return (
			<div className='card card-body mb-3'>
				<div className='row'>
					<div className='col-md-2'>
						<a href='profile.html'>
							<img
								className='rounded-circle d-none d-md-block'
								src={post.avatar}
								alt=''
							/>
						</a>
						<br />
						<p className='text-center'>{post.name}</p>
					</div>
					<div className='col-md-10'>
						<p className='lead'>{post.text}</p>
						<div className="mt-5">
							<button
								onClick={this.onLikeClick.bind(this, post._id)}
								type='button'
								className='btn btn-light mr-1'
							>
								<i
									className={classnames('fas fa-thumbs-up', {
										'text-info': this.findUserLikes(post.likes)
									})}
								></i>
								<span className='badge badge-light'>{post.likes.length}</span>
							</button>
							<button
								onClick={this.onUnlikeClick.bind(this, post._id)}
								type='button'
								className='btn btn-light mr-1'
							>
								<i className='text-secondary fas fa-thumbs-down'></i>
							</button>
							{showActions && (
								<Link to={`post/${post._id}`} className='btn btn-info mr-1'>
									Answers ({post.comments.length})
								</Link>
							)}
							{post.user === auth.user.id && (
								<button
									onClick={this.onDeleteClick.bind(this, post._id)}
									type='button'
									className='btn btn-danger pr-2'
								>
									<i className='fas fa-times' />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

PostItem.defaultProps = {
	showActions: true
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
	PostItem
)
