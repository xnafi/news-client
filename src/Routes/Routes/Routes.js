import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Login from "../../LoginAndSignUp/LoginPage/LoginPage";
import Register from "../../LoginAndSignUp/SignUpPage/Register";
import Category from "../../Pages/Category/Category/Category";
import Home from "../../Pages/Home/Home/Home";
import News from "../../Pages/News/News/News";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://news-express-server.vercel.app/news')
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`https://news-express-server.vercel.app/catagory/${params.id}`),
                element: <Category></Category>
            },
            {
                path: '/news/:id',
                element: <PrivateRoute> <News /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://news-express-server.vercel.app/news/${params.id}`)
            }
            ,
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])