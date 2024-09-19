import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import Error from './components/Error';
const AppLayout = () =>{
    
    return(
        <>   
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};
const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children:[
            {
                path: '/',
                element: <Body />
            },
            {
                path:'/about',
                element: <About />
            },
            {
                path: '/restaurantcard',
                element: <Restaurantcard />
            },
            {
                path: '/cart',
                element:<Cart />
            }
        ],
        errorElement : <Error />
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />)