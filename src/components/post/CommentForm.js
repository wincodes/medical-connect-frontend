import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addComment } from '../../actions/postActions'

class  CommmentForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			errors: {}
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
  }
  
  componentWillReceiveProps(newProps){
    if(newProps.errors){
      this.setState({ errors: newProps.errors})
    }
  }

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
    e.preventDefault()
    this.setState({ errors: {}})

    const { user } = this.props.auth
    const { postId } = this.props

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }
		this.props.addComment(postId, newComment)
    
    this.setState({ text: ''})
	}

	render() {
		const { errors } = this.state
		return (
			<div className='post-form mb-3'>
				<div className='card card-info'>
					<div className='card-header bg-info text-white'>Add an Answer...</div>
					<div className='card-body'>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<TextAreaFieldGroup
									placeholder='comment'
									name='text'
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
								/>
							</div>
							<button type='submit' className='btn btn-dark'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

CommmentForm.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, { addComment   })(CommmentForm)
