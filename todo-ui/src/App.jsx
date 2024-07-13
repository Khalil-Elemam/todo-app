

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoginPage, SignUpPage, HomePage, AccountActivationPage, NotFoundPage } from './pages'
import AuthProvider from './context/AuthProvider'
import { RequiresAuth } from './components'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RequiresAuth>
          <HomePage />
        </RequiresAuth>
      )
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
      path: '/activate-account',
      element: <AccountActivationPage />
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router = {router}/>
    </AuthProvider>
  )
}

export default App
