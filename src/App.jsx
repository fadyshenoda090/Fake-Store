import { useEffect, useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './appLayout/AppLayout'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import NotFound from './pages/notFound/NotFound'
import LogIn from './pages/logIn/LogIn'
import Register from './pages/register/Register'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { Provider } from 'react-redux'
import store from './store/store'
import Cart from './pages/cart/Cart'
import Details from './pages/details/Details'
import Error from './pages/error/Error'

function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  }, [])

  const router = createBrowserRouter([
    {
      path: '/', element: <AppLayout />, errorElement: <Error />,
      children: [
        { index: true, element: <Home />, errorElement: <Error /> },
        { path: 'about', element: <About />, errorElement: <Error /> },
        { path: 'contactUs', element: <Contact />, errorElement: <Error /> },
        { path: 'login', element: <LogIn />, errorElement: <Error /> },
        { path: 'register', element: <Register />, errorElement: <Error /> },
        { path: 'cart', element: <Cart /> },
        { path: 'details/:id', element: <Details />, errorElement: <Error /> },
        { path: '*', element: <NotFound /> }
      ]
    },
  ])

  return (
    <>
      <LanguageProvider value={{ language, setLanguage }}>
        <ThemeProvider value={{ theme, setTheme }}>
          <section className={`${theme} ${theme == 'dark' ? 'bg-slate-900' : ''} min-h-[100vh]`}>
            <Provider store={store}>
              <RouterProvider router={router} />
            </Provider>
          </section>
        </ThemeProvider>
      </LanguageProvider>
    </>
  )
}

export default App
