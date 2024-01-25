import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import axiosInstance from '../../axiosConnfig/axiosConfig'
import { HiOutlineMagnifyingGlass, HiMoon, HiSun } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink } from 'react-router-dom';
import { localization } from '../../localization/localization';
import { languageContext } from '../../contexts/LanguageContext';
import { themeContext } from '../../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import SubNavMenu from '../subNavMenu/SubNavMenu';
import NavMenu from '../navMenu/NavMenu';
import { toggler } from '../../store/slices/subMenuToggle';

const Header = () => {
    const { language, setLanguage } = useContext(languageContext)
    const { theme, setTheme } = useContext(themeContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const cartCounter = useSelector((state) => state.cartCounter.counter)
    const isMenuHidden = useSelector((state) => state.subMenuToggler.isMenuHidden)
    const dispatch = useDispatch()

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const getSearchProducts = async () => {
                const res = await axiosInstance.get(`/products/search?q=${searchQuery}`);
                setProducts(res.data.products);
                // console.log(res.data.products);
                console.log(searchResults);
            };

            if (searchQuery.trim() !== '') {
                getSearchProducts();
            }
        }, 1500);

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().startsWith(query);
        })

        filteredProducts.forEach((product) => {
            if (searchResults.some((result) => result.id != product.id)) {
                setSearchResults((prevResults) => [...prevResults, product]);
            }
        });

        setSearchResults((prevResults) =>
            prevResults.filter((result) =>
                filteredProducts.some((product) => product.id === result.id)
            )
        );
    };



    return (
        <>
            <div className={`flex md:justify-between justify-evenly h-[4rem] ${theme == 'dark' ? 'bg-slate-900' : 'bg-gradient-to-bl from-gray-300 via-slate-300 to-slate-100'} items-center`}>
                <div className='flex w-fit items-center text-2xl font-bold  py-1 px-6'>
                    <Link to='/'><img src='/logo.png' className='h-[3rem] w-[3rem] me-2 mt-3' /></Link>
                    <h2 className='dark:text-white mt-5 hidden md:block'>Fake Store</h2>
                </div>
                <div className='flex items-center justify-center col-span-2 bg-slate-50 w-7/12 rounded-xl'>
                    <input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`w-full h-[2rem] rounded-lg lg:p-2 bg-transparent outline-none ${language == 'en' ? 'text-start' : 'text-end'}`}
                        type="search"
                        placeholder={language == "en" ? localization.searchPlaceholder.en : localization.searchPlaceholder.ar}
                    />
                    <button className='bg-amber-400 py-1 lg:px-3 text-lg rounded-xl hover:scale-105 flex items-center'>
                        <HiOutlineMagnifyingGlass className='text-xl' /><span className='mt-1'>{language == 'en' ? localization.search.en : localization.search.ar}</span>
                    </button>
                </div>
                <div className='sm-block md:hidden'>
                    <CiMenuBurger className='text-3xl dark:text-white' onClick={() => dispatch(toggler(!isMenuHidden))} />
                </div>
                <div className='md:flex hidden items-center justify-center gap-3 me-1'>
                    {theme === 'light' ? (
                        <HiMoon onClick={() => { setTheme('dark'); localStorage.setItem('theme', 'dark') }} className='text-4xl bg-slate-200 text-black rounded-full p-1 cursor-pointer' />
                    ) : (
                        <HiSun onClick={() => { setTheme('light'); localStorage.setItem("theme", "light") }} className='text-4xl bg-[#11291f] text-white rounded-full p-1 cursor-pointer' />
                    )}
                    <select onChange={(e) => setLanguage(e.target.value)} className='text-xl bg-transparent dark:text-white'>
                        <option className='dark:bg-slate-800' value="en">English</option>
                        <option className='dark:bg-slate-800' value="ar">Arabic</option>
                    </select>
                </div>
            </div>
            {isMenuHidden ? null : <SubNavMenu />}
            <NavMenu />
        </>
    )
}

export default Header
