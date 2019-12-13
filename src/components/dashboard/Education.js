import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
	onDeleteClick(id) {
		this.props.deleteEducation(id)
	}

	render() {
		const education = this.props.education.map(edu => (
			<li key={edu._id} className='list-group-item'>
				<div>
					<strong>{edu.school}</strong>
				</div>
				<div>
					{edu.degree} - {edu.fieldOfStudy}
				</div>
				<small className='text-muted'>
					<Moment format='MMMM YYYY'>{edu.from}</Moment> -{' '}
					{edu.to === null ? (
						'Present'
					) : (
						<Moment format='MMMM YYYY'>{edu.to}</Moment>
					)}
				</small>
				{edu.description && <p>{edu.description}</p>}
				<div>
					<button
						className='btn btn-danger mt-2'
						onClick={this.onDeleteClick.bind(this, edu._id)}
					>
						Delete
					</button>
				</div>
			</li>
		))
		return (
			<div className='pt-4'>
				<h4 className='mb-4'>Educational Qualifications</h4>
				{education}
			</div>
		)
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
