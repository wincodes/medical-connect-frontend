import axios from 'axios'

import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_PROFILES,
	URL
} from './types'

export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading())

	axios
		.get(`${URL}/profile`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		)
}

export const getProfileByHandle = (handle) => dispatch => {
	dispatch(setProfileLoading())

	axios
		.get(`${URL}/profile/handle/${handle}`)
		.then(res => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: null
			})
		)
}

export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading())

	axios
		.get(`${URL}/profile/all`)
		.then(res => {
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			})
		})
		.catch(err =>
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		)
}

export const createProfile = (profileData, history) => dispatch => {
	dispatch(setProfileLoading())

	axios
		.post(`${URL}/profile`, profileData)
		.then(res => history.push('/dashboard'))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
}

export const addExperience = (data, history) => dispatch => {
	axios
		.post(`${URL}/profile/experience`, data)
		.then(res => {
			history.push('/dashboard')
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

export const addEducation = (data, history) => dispatch => {
	axios
		.post(`${URL}/profile/education`, data)
		.then(res => {
			history.push('/dashboard')
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

export const deleteExperience = id => dispatch => {
	if (window.confirm('Delete this Experience? This cannot be Reversed')) {
		axios
			.delete(`${URL}/profile/experience/${id}`)
			.then(res => {
				dispatch({
					type: GET_PROFILE,
					payload: res.data
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			})
	}
}

export const deleteEducation = id => dispatch => {
	if (window.confirm('Delete this Education? This cannot be Reversed')) {
		axios
			.delete(`${URL}/profile/education/${id}`)
			.then(res => {
				dispatch({
					type: GET_PROFILE,
					payload: res.data
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			})
	}
}

export const deleteAccount = () => dispatch => {
	if (window.confirm('Delete Account? This cannot be Reversed')) {
		axios
			.delete(`${URL}/profile`)
			.then(res => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			})
	}
}

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	}
}

export const clearCurrentprofile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	}
}
