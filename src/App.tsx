import './App.css'
// import HomePage from './components/HomePage'
import { RouterProvider } from 'react-router'
import { myRouter } from './Router'

function App() {

  return (
    <>
    {/* <HomePage/> */}
    <RouterProvider router={myRouter} />

    </>
  )
}

export default App
