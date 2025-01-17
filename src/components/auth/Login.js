import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from '../../actions/authActions'
import Loading from '../Loading'
import TextFieldGroup from '../common/TextFieldGroup'
import image from '../../img/Young-Male-Doctor.svg'

class Login extends Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			errors: {},
			loading: false
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard')
		}
		if (nextProps) {
			this.setState({ errors: nextProps.errors, loading: false })
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })

		const loginDetails = {
			email: this.state.email,
			password: this.state.password
		}

		this.props.loginUser(loginDetails)
	}

	render() {
		const { errors, loading } = this.state
		return (
			<div className='login'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-7 col-sm-12 m-auto'>
							{loading && <Loading />}
							<h2 className='text-center'>Log In</h2>
							<p className='text-center'>
								Sign in to your Medical Connect account
							</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									type='email'
									placeholder='Email Address'
									name='email'
									value={this.state.email}
									onChange={this.onChange}
									error={errors.email}
								/>

								<TextFieldGroup
									type='password'
									placeholder='password'
									name='password'
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

								<input type='submit' className='btn btn-info btn-block mt-4' />
							</form>
						</div>
						<div className='col-md-5 d-none d-md-block'>
							<img src={image} className='img-fluid svg-img' alt="" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Login.protoTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToprops = state => ({
	auth: state.auth,
	errors: state.errors
})
export default connect(mapStateToprops, { loginUser })(Login)
