import React, { Fragment, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


//user login
const Login = ({ login, isAuthenticated }: any): any => {
  const [formDate, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formDate;

  const onChange = (e: any) =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect
  if (isAuthenticated) {
    Router.push('/');
  }

  return (
    <Fragment>
      <div className='container divCenter'>
        <h1 className='large text-primary'>Log In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Enter In To Your Shopping App
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input

              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input

              type='password'
              placeholder='Password'
              name='password'
              minLength={6}
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Submit' />
        </form>
        <br />
        <p className='my-1'>
          {/* <p style={{ margin: '5px 0px 5px 0px' }}>Forgot Password  <Link href="/auth/PasswordReset">Click Here</Link> </p> */}
          Don't have an account? <Link href='/auth/register'>Sign Up</Link>
        </p>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
