import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { LoginPage, SignUpPage, HomePage, AccountActivationPage } from './pages'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignUpPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/register',
      element: <SignUpPage />
    },
    {
      path: '/todos',
      element: <HomePage />
    },
    {
      path: '/settings',
      element: <HomePage />
    },
    {
      path: '/activate-account',
      element: <AccountActivationPage />
    }
  ])

  {
      /*<BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />} action = {action}/>
      </Routes>
    </BrowserRouter>*/
  }

  return (
    <RouterProvider router = {router}/>
  )
}

export default App
