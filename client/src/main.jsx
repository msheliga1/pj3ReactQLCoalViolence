import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import Homepage from './pages/Homepage'
import Favorites from './pages/Favorites'
import MyFights from './pages/MyFights'
import NewFight from './pages/NewFight'
import NewFightForm from './pages/NewFightForm'

// Notice that SearchBooks is the index - ie. the / route. 
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Coal Camp Violence App Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: '/search',
        element: <SearchBooks />
      },
      {
        path: '/favorites',
        element: <Favorites />
      }, {
        path: '/myFights',
        element: <MyFights />
      }, {
        path: '/newFight',
        element: <NewFight />
      }, {
        path: '/newFightForm',
        element: <NewFightForm />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
