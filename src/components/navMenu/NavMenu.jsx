import React, { useContext } from 'react'
import { localization } from '../../localization/localization'
import { languageContext } from '../../contexts/LanguageContext'
import { NavLink } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import { toggler } from '../../store/slices/subMenuToggle'
import { useSelector } from 'react-redux'

const NavMenu = () => {
    const { language, setLanguage } = useContext(languageContext)
    const counter = useSelector((state) => state.cartCounter.counter)
    return (
        <div className='w-full hidden md:block'>
            <ul className={`text-lg list-unstyled flex gap-8 h-[3rem] items-center justify-center ${language == 'en' ? '' : 'flex flex-row-reverse'}`}>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/'>
                    <li className='li'>{language == 'en' ? localization.home.en : localization.home.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/about'>
                    <li className='li'>{language == 'en' ? localization.about.en : localization.about.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/contactUs'>
                    <li className='li'>{language == 'en' ? localization.contact.en : localization.contact.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='/cart'>
                    <li className='flex justify-center items-center li'>
                        Cart &nbsp;<IoMdCart className='text-3xl relative' />
                        <span className="absolute rounded-full bg-amber-400 bottom-4 left-16 px-2 text-sm font-medium text-black">
                            <p className='mt-1'>{counter}</p>
                        </span>
                    </li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='login'>
                    <li className='li'>{language == 'en' ? localization.login.en : localization.login.ar}</li>
                </NavLink>
                <NavLink className={({ isActive }) => (isActive) ? 'text-orange-500 acctive ' : 'dark:text-white text-black'} to='register'>
                    <li className='li'>{language == 'en' ? localization.register.en : localization.register.ar}</li>
                </NavLink>
            </ul>
        </div>
    )
}

export default NavMenu
