import axios from 'axios'
import {
	ADD_POST,
	GET_ERRORS,
	GET_POSTS,
	POST_LOADING,
	DELETE_POST,
	LIKE_CHANGED,
	GET_POST,
	URL
} from './types'

export const addPost = postData => dispatch => {
	// dispatch(setPostLoading())

	axios
		.post(`${URL}/posts`, postData)
		.then(res => {
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const getPosts = () => dispatch => {
	dispatch(setPostLoading())

	axios
		.get(`${URL}/posts`)
		.then(res => {
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		)
}
export const getPost = id => dispatch => {
	dispatch(setPostLoading())

	axios
		.get(`${URL}/posts/${id}`)
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_POST,
				payload: null
			})
		)
}

export const deletePost = id => dispatch => {
	if (window.confirm('Delete your Post? This cannot be Reversed')) {
		axios
			.delete(`${URL}/posts/${id}`)
			.then(res => {
				dispatch({
					type: DELETE_POST,
					payload: id
				})
			})
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			)
	}
}

export const addLike = id => dispatch => {
	axios
		.post(`${URL}/posts/like/${id}`)
		.then(res => {
			dispatch({
				type: LIKE_CHANGED,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const removeLike = id => dispatch => {
	axios
		.post(`${URL}/posts/unlike/${id}`)
		.then(res => {
			dispatch({
				type: LIKE_CHANGED,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const addComment = (postId, commentData) => dispatch => {
	axios
		.post(`${URL}/posts/comment/${postId}`, commentData)
		.then(res => {
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const deleteComment = (postId, commentId) => dispatch => {
	if (window.confirm('Delete your Comment? This cannot be Reversed')) {
		axios
			.delete(`${URL}/posts/comment/${postId}/${commentId}`)
			.then(res => {
				dispatch({
					type: GET_POST,
					payload: res.data
				})
			})
			.catch(err =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			)
	}
}

export const setPostLoading = () => {
	return {
		type: POST_LOADING
	}
}
