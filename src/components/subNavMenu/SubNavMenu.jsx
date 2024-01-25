import React, { useContext } from 'react'
import { languageContext } from '../../contexts/LanguageContext'
import { localization } from '../../localization/localization'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggler } from '../../store/slices/subMenuToggle'
import { IoMdCart } from "react-icons/io";

const SubNavMenu = () => {
    const { language, setLanguage } = useContext(languageContext)
    const isMenuHidden = useSelector((state) => state.subMenuToggler.isMenuHidden)
    const counter= useSelector((state)=>state.cartCounter.counter)
    const dispatch = useDispatch()
    return (
        <div className='w-full text-center flex justify-center items-center'>
            <ul className={`text-lg list-unstyled flex-col ${language == 'en' ? '' : ''}`}>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/cart'>
                    <li onClick={() => dispatch(toggler(!isMenuHidden))} className='my-5 border-b flex justify-center'>
                        Cart &nbsp;<IoMdCart className='text-3xl relative' />
                        <span className="absolute rounded-full bg-amber-400 bottom-5 left-20 px-2 text-sm font-medium text-black">
                            <p className='mt-1'>{counter}</p>
                        </span>
                    </li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/'>
                    <li onClick={() => dispatch(toggler(!isMenuHidden))} className='text-xl my-5 border-b'>{language == 'en' ? localization.home.en : localization.home.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/about'>
                    <li onClick={() => dispatch(toggler(!isMenuHidden))} className='text-xl my-5 border-b'>{language == 'en' ? localization.about.en : localization.about.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/contactUs'>
                    <li onClick={() => dispatch(toggler(!isMenuHidden))} className='text-xl my-5 border-b'>{language == 'en' ? localization.contact.en : localization.contact.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='login'>
                    <li onClick={() => dispatch(toggler(!isMenuHidden))} className='text-xl my-5 border-b'>{language == 'en' ? localization.login.en : localization.login.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='register'>
                    <li onClick={() => dispatch(toggler(!isMenuHidden))} className='text-xl my-5 border-b'>{language == 'en' ? localization.register.en : localization.register.ar}</li>
                </NavLink>
            </ul>
        </div>
    )
}

export default SubNavMenu
