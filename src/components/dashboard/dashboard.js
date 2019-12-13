import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Loading from '../Loading'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'
import image from '../../img/Nurse_Practise.svg'

class Dashboard extends Component {
	constructor() {
		super()
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		this.props.getCurrentProfile()
	}

	onDeleteClick(e) {
		e.preventDefault()
		this.setState({ loading: true })
		this.props.deleteAccount()
	}

	render() {
		const { user } = this.props.auth
		const { profile, loading } = this.props.profile

		let dashboardContent

		if (profile == null || loading) {
			dashboardContent = <Loading />
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className='text-muted'>
							Hi, {user.name}{' '}
							<Link to={`/profile/${profile.handle}`} className='btn btn-light'>
								<i className='fas fa-user-circle text-info mr-1'></i> View Your
								Profile
							</Link>
						</p>
						<ProfileActions />
						<Experience experience={profile.experience} />
						<Education education={profile.education} />
						<div style={{ marginTop: '60px' }}>
							<button
								onClick={this.onDeleteClick.bind(this)}
								className='btn btn-danger'
							>
								Delete my Account
							</button>
						</div>
					</div>
				)
			} else {
				//logged in user has no profile
				dashboardContent = (
					<div>
						<p className='lead text-muted'>Welcome {user.name}</p>
						<p>You have not Setup your Profile</p>
						<Link to='/create-profile' className='btn btn-lg btn-info'>
							{' '}
							Create Profile
						</Link>
					</div>
				)
			}
		}
		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-7 col-sm-12 pt-4'>
							{this.state.loading && <Loading />}
							<h4 className='mb-2'>Dashboard</h4>
							{dashboardContent}
						</div>

						<div className='col-md-5 d-none d-md-block'>
							<img src={image} className="img-fluid svg-img" alt="" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
	Dashboard
)
