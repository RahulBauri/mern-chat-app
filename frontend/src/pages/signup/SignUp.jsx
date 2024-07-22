import React, { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link, Navigate } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import { useAuthContext } from '../../context/AuthContext';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const { loading, signup } = useSignup();

  const { authUser } = useAuthContext();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  if (authUser) {
    return <Navigate to='/' />;
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>chatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              type='text'
              placeholder='John Doe'
              value={inputs.fullName}
              name='fullName'
              onChange={onChangeHandler}
              className='w-full input input-bordered h-10'
            />
          </div>
          {/* USERNAME */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              type='text'
              placeholder='Enter username'
              name='username'
              value={inputs.username}
              onChange={onChangeHandler}
              className='w-full input input-bordered h-10'
            />
          </div>
          {/* PASSWORD */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter password'
              name='password'
              value={inputs.password}
              onChange={onChangeHandler}
              className='w-full input input-bordered h-10'
            />
          </div>
          {/* CONFIRM PASSWORD */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm password'
              name='confirmPassword'
              value={inputs.confirmPassword}
              onChange={onChangeHandler}
              className='w-full input input-bordered h-10'
            />
          </div>
          {/* GENDER CHECKBOX */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <Link
            to='/login'
            className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
          >
            Already have an account?
          </Link>
          <div>
            <button
              type='submit'
              className='btn btn-block btn-sm mt-2'
              disabled={loading}
            >
              {loading ? (
                <span className='loading loading-spinner' />
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
