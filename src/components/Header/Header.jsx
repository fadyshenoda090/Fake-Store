import React, { useContext, useEffect, useState } from 'react'
import './header.css'
import axiosInstance from '../../axiosConnfig/axiosConfig'
import { HiOutlineMagnifyingGlass, HiMoon, HiSun } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
    const isMenuHidden = useSelector((state) => state.subMenuToggler.isMenuHidden)
    const dispatch = useDispatch()

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            const getProductsList = async () => {
                try {
                    const res = await axiosInstance.get(`/products/search?q=${searchQuery}`);
                    setProducts(res.data.products);
                    // console.log(res.data.products);
                    // console.log(products);
                } catch (err) {
                    console.log(err);
                };
            }

            if (searchQuery.trim() !== '') {
                getProductsList();
            }
        }, 1000);

        return () => clearTimeout(delaySearch);
    }, [products, searchQuery]);


    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();

        setSearchQuery(query);

        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().startsWith(query);
        });

        // Check if the product is not already in the searchResults array, then push it
        filteredProducts.forEach((product) => {
            if (!searchResults.some((result) => result.id === product.id)) {
                setSearchResults((prevResults) => [...prevResults, product]);
            }
        });

        // Remove products from searchResults that are not in the filtered products
        setSearchResults((prevResults) =>
            prevResults.filter((result) =>
                filteredProducts.some((product) => product.id === result.id)
            )
        );
    };

    const navigate = useNavigate()



    return (
        <>
            <div className={`flex md:justify-between justify-evenly h-[4rem] sticky top-0 z-40 ${theme == 'dark' ? 'bg-[#403546]' : 'bg-gradient-to-br from-neutral-300 to-neutral-100'} items-center`}>
                <Link to='/'>
                    <div className='flex w-fit items-center text-2xl font-bold  py-1 px-6'>
                        <img src='/logo.png' className='h-[3rem] w-[3rem] me-2 mt-3' />
                        <h2 className='dark:text-white mt-5 hidden md:block'>Fake Store</h2>
                    </div>
                </Link>
                <div className=' col-span-2 flex-col  w-7/12 '>
                    <div className='flex items-center justify-center rounded-xl bg-slate-50'>
                        <input
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={`w-full h-[2rem] rounded-lg px-2 bg-transparent outline-none ${language == 'en' ? 'text-start' : 'text-end'}`}
                            type="search"
                            placeholder={language == "en" ? localization.searchPlaceholder.en : localization.searchPlaceholder.ar}
                        />
                        <button className='bg-[#f0ec8b] py-1 lg:px-3 text-lg rounded-xl hover:scale-105 flex items-center'>
                            <HiOutlineMagnifyingGlass className='text-xl' /><span className='mt-1'>{language == 'en' ? localization.search.en : localization.search.ar}</span>
                        </button>
                    </div>
                    <>
                        {searchResults.length > 0 && searchQuery.length >0 && (
                            <div className='absolute bg-white dark:bg-[#403546] w-[53.4%] overflow-y-scroll rounded-lg shadow-lg mt-2' style={{
                                height: `${searchResults.length * 4}rem`, maxHeight: '12rem'
                            }}>
                                {searchResults.map((product) => {
                                    return (
                                        <div className='flex items-center justify-between border-b border-gray-200 dark:border-white p-2' key={product.id}>
                                            <div className='flex items-center gap-5 font-bold text-xl dark:text-white cursor-pointer' onClick={() => {
                                                navigate(`/details/${product.id}`);
                                                setSearchQuery('')
                                                setProducts([])
                                            }}>
                                                <img className='h-[3rem] w-[3rem] rounded-lg' src={product.images?.[0]} alt={product.title} />
                                                <p className='text-lg'>{product.title}</p>
                                            </div>
                                            <Link to={`/details/${product.id}`}>
                                                <button onClick={() => {
                                                    setSearchQuery('')
                                                    setProducts([])
                                                }} className='bg-[#f0ec8b] rounded-lg px-3 py-1 text-lg hover:shadow hover:shadow-[#fffaa0] hover:scale-105'>Details</button>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </>
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
