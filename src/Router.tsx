import {  createBrowserRouter } from "react-router"
import HomePage from "./components/HomePage"
import Empty from "./components/Empty"
import Person from "./components/Person"
import AppLayout from "./components/AppLayout"



export const myRouter = createBrowserRouter([
{
    path: '/',
    element: <AppLayout />,
    errorElement: <>main error</>,
    children: [
        {path: '/',element: <HomePage/>},
        {path: 'person/:name', element: <Person />},
        {path: '/empty',element: <Empty/>}

    ]

}

])
export default myRouter;

