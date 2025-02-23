import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Products, {loader as porductsLoader, action as updateAvailabilityAction} from "./views/Products"
import NewProduct, {action as NewProductAction} from "./views/NewProduct"
import EditProduct, {loader as editProductLoader, action as editProductAction} from "./views/EditProduct"
import { action as deleteProductAction} from "./components/ProductDetails"


export const router = createBrowserRouter([
    {
        path: '/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element: <Products/>,
                loader:porductsLoader,
                action: updateAvailabilityAction

            },
            {
                path:'/productos/nuevo',
                element:<NewProduct/>,
                action: NewProductAction
            },
            {
                path:'/productos/:id/editar',//ROA pattern - Resource-oriented desing
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'/productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])