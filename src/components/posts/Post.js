import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostForm from './PostForm'
import Loading from '../Loading'
import { getPosts } from '../../actions/postActions'
import PostFeed from './PostFeed'

class Post extends Component {
	componentDidMount() {
		this.props.getPosts()
	}
	render() {
		const { posts, loading } = this.props.post
		let postContent

		if (posts === null || loading) {
			postContent = <Loading />
		} else {
			postContent = <PostFeed posts={posts} />
		}

		return (
			<div className='feed'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 m-auto'>
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	post: state.post
})

export default connect(mapStateToProps, { getPosts })(Post)
