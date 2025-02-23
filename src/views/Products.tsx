import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, partialUptdate } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({request}:ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    if(data.id !== undefined){
        await partialUptdate(+data.id)
    }
    
    return {}
}

export default function Products() {

    const products = useLoaderData() as Product[]
    

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    to={'productos/nuevo'}
                    className="bg-indigo-600 text-white text-sm rounded-lg font-bold p-4 uppercase shadow hover:bg-indigo-500"
                >
                    Agregar Producto
                </Link>
            </div>
            <div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr className="">
                            <th className="p-2 ">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(product =>(
                            <ProductDetails
                                key={product.id}
                                product ={product}
                            />
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}
