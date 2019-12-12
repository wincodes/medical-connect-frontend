import React, { Component } from 'react'
import isEmpty from '../../../validation/is-empty'

class Header extends Component {
	render() {
    const { profile } = this.props
    if(!profile.social || Object.keys(profile.social).length === 0){
      profile.social = {}
    }
		return (
			<div className='row'>
				<div className='col-md-12'>
					<div className='card card-body bg-info text-white mb-3'>
						<div className='row'>
							<div className='col-4 col-md-3 m-auto'>
								<img
									className='rounded-circle'
									src={profile.user.avatar}
									alt=''
								/>
							</div>
						</div>
						<div className='text-center'>
							<h1 className='display-4 text-center'>{profile.user.name}</h1>
							<p className='lead text-center'>
								{profile.status}{' '}
								{isEmpty(profile.workPlace) ? null : (
									<span>
										{' '}
										at <strong>{profile.workPlace}</strong>
									</span>
								)}
							</p>
							<p>{profile.location}</p>
							<p>
								{profile.website && (
									<a
										className='text-white p-2'
										href={profile.website}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fas fa-globe fa-2x'></i>
									</a>
								)}
								{profile.social.twitter && (
									<a
										className='text-white p-2'
										href={profile.social.twitter}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fab fa-twitter fa-2x'></i>
									</a>
								)}
								{profile.social.facebook && (
									<a
										className='text-white p-2'
										href={profile.social.facebook}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fab fa-facebook fa-2x'></i>
									</a>
								)}
								{profile.social.linkedin && (
									<a
										className='text-white p-2'
										href={profile.social.linkedin}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fab fa-linkedin fa-2x'></i>
									</a>
								)}
								{profile.social.instagram && (
									<a
										className='text-white p-2'
										href={profile.social.instagram}
										target='_blank'
										rel='noopener noreferrer'
									>
										<i className='fab fa-instagram fa-2x'></i>
									</a>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Header
