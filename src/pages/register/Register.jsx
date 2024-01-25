import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <section className='w-screen flex justify-center px-3 py-28'>
      <div className='w-[60vw] flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-700 shadow-lg shadow-slate-400 dark:shadow-slate-500 p-5'>
        <h2 className='text-3xl font-bold text-center mb-3'>Create An Account</h2>
        <form autoComplete='off' className='w-full flex flex-col justify-center items-center px-3'>
          <div className='flex gap-5 justify-between w-full'>
            <div className='w-full'>
              <label htmlFor="fName" className='text-lg font-semibold dark:text-white'>Enter your first name: </label>
              <input id='fName' className='bg-white w-full h-10 mb-5 p-2 rounded-lg outline-none' type="text" placeholder='First Name' />
            </div>
            <div className='w-full'>
              <label htmlFor="lName" className='text-lg font-semibold dark:text-white'>Enter your last name: </label>
              <input id='lName' className='bg-white w-full h-10 mb-5 p-2 rounded-lg outline-none' type="text" placeholder='Last Name' />
            </div>
          </div>
          <div>
            <label htmlFor="email" className='text-lg font-semibold dark:text-white'>Enter your E-mail</label>
            <input id='email' className='bg-white w-full h-10 mb-5 p-2 rounded-lg outline-none' type="email" placeholder='Email' />
            <label htmlFor="password" className='text-lg font-semibold dark:text-white'>Eneter a strong password</label>
            <input id='password' className='bg-white w-full h-10 mb-5 p-2 rounded-lg outline-none' type="password" placeholder='Password' />
            <label htmlFor="confirmPasswd" className='text-lg font-semibold dark:text-white'>Confirm password</label>
            <input id='confirmPasswd' className='bg-white w-full h-10 mb-5 p-2 rounded-lg outline-none' type="password" placeholder='Confirm Password' />
          </div>
          <button className='w-6/12 h-10 my-3 p-2 rounded-xl outline-none bg-amber-400 text-xl font-bold'>
            <Link to='/login'>
              Register
            </Link>
          </button>
        </form>
        <div className='dark:text-white'>
          have an account? &nbsp;<Link to='/login' className='text-lg text-blue-600 hover:underline'>
              logIn
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Register
