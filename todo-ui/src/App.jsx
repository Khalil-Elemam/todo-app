

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { LoginPage, SignUpPage, HomePage, AccountActivationPage, NotFoundPage } from './pages'
import AuthProvider from './context/AuthProvider'
import { RequiresAuth } from './components'
import PersistLogin from "./components/auth/PersistLogin"

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PersistLogin />,
      children: [
        {index: true, element: (
          <RequiresAuth>
            <HomePage />
          </RequiresAuth>
        )}
      ]
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
