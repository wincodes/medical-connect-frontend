import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault()
		this.props.logoutUser()
	}

	render() {
		const { isAuthenticated, user } = this.props.auth

		const authLinks = (
			<ul className='nav'>
				<Link className='nav-link' to='/dashboard'>
				<li className='nav-item'>
					<img
						src={user.avatar}
						alt={user.name}
						style={{ width: '25px', marginRight: '5px' }}
						className='rounded-circle d-none d-md-block'
						title={user.name}
					/>
				</li>
				</Link>
				<Link className='nav-link' to='/dashboard'>
					<li className='nav-item'>{user.name}</li>
				</Link>

				<li className='nav-item'>
					<Link className='nav-link' to='/feed'>
						Q & A
					</Link>
				</li>

				<li className='nav-item'>
					<Link className='nav-link' to='/profiles'>
						{' '}
						Professionals
					</Link>
				</li>

				<li className='nav-item'>
					<div
						onClick={this.onLogoutClick.bind(this)}
						className='nav-link'
						style={{ cursor: 'pointer' }}
					>
						Log Out
					</div>
				</li>
			</ul>
		)

		const guestLinks = (
			<ul className='nav'>
				<li className='nav-item'>
					<Link className='nav-link' to='/register'>
						Sign Up
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link' to='/login'>
						Login
					</Link>
				</li>
			</ul>
		)

		return (
			<nav className='navbar navbar-expand-sm navbar-dark mb-4'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>
						Medical Connect
					</Link>
					{isAuthenticated ? authLinks : guestLinks}
				</div>
			</nav>
		)
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
