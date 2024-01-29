import React from 'react'
import { Link } from 'react-router-dom'

const LogIn = () => {
  const formSubmit = (e) => {
    e.preventDefault()
    console.log('form submitted')
  }

  return (
    <section className='w-screen flex justify-center px-3 py-28'>
      <div className="w-[60vw] flex flex-col justify-center items-center bg-slate-100 dark:bg-[#403546] shadow-lg shadow-slate-400 dark:shadow-slate-500 p-5">
            <h2 className="text-3xl font-bold text-center dark:text-white">
              Sign in to your account
            </h2>
            <form autoComplete='off' className='w-full flex flex-col justify-center items-center px-3' onSubmit={(e) => { formSubmit(e) }}>
              <div className='w-full'>
                <label htmlFor="email" className="block text-lg mb-2 font-medium dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-white sm:text-sm rounded-lg  block w-full p-2.5 outline-none" placeholder="name@company.com" />
              </div>
              <div className='w-full mt-3'>
                <label htmlFor="password" className="block text-lg mb-2 font-medium dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-white border sm:text-sm rounded-lg block w-full p-2.5 mb-2 outline-none" required="" />
              </div>
              <div className="w-full px-2 flex flex-col md:flex-row justify-start gap-2 md:gap-0  md:items-center md:justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="cursor-pointer w-4 h-4 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-md">
                    <label htmlFor="remember" className="text-gray-500 dark:text-white">Remember me</label>
                  </div>
                </div>
                <p className="text-sm font-medium hover:underline text-blue-700">Forgot password?</p>
              </div>
              <button className='w-full h-10 my-3 p-2 rounded-xl outline-none bg-amber-400 text-xl font-bold'>
                <Link to='/'>
                  LogIn
                </Link>
              </button>
              <p className="text-sm font-light dark:text-white">
                Don't have an account yet? <Link to='/register' className="font-medium text-blue-700 hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
    </section>
  )
}

export default LogIn
