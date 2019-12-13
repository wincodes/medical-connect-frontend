import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
	onDeleteClick(id) {
		this.props.deleteExperience(id)
	}

	render() {
		const experience = this.props.experience.map(exp => (
			<li key={exp._id} className='list-group-item'>
				<div>
					<strong>{exp.title}</strong>
				</div>
				<div>{exp.organization}</div>
				<small className='text-muted'>
					<Moment format='MMMM YYYY'>{exp.from}</Moment> -{' '}
					{exp.to === null ? (
						'Present'
					) : (
						<Moment format='MMMM YYYY'>{exp.to}</Moment>
					)}
				</small>
				{exp.description && <p>{exp.description}</p>}
				<div>
					<button
						className='btn btn-danger mt-2'
						onClick={this.onDeleteClick.bind(this, exp._id)}
					>
						Delete
					</button>
				</div>
			</li>
		))
		return (
			<div>
				<h4 className='mb-4'>Work Experience</h4>
				{experience}
			</div>
		)
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
