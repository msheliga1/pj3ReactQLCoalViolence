import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'
import MyFights from './pages/MyFights'
import NewFight from './pages/NewFight'

// Notice that SearchBooks is the index - ie. the / route. 
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Books App Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: '/favorites',
        element: <SavedBooks />
      }, {
        path: '/myFights',
        element: <MyFights />
      }, {
        path: '/newFight',
        element: <NewFight />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
