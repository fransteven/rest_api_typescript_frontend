import { ActionFunctionArgs, useFetcher } from "react-router-dom"
import { Form, redirect, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps= {
    product: Product
}
export async function action({params}:ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product}:ProductDetailsProps) {
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form 
                    method="POST"
                    >
                        <button 
                            type="submit"
                            name="id"
                            value={product.id}
                            className={`${product.availability?'bg-red-600':'bg-green-600'} text-white rounded-lg w-2/3 py-2 uppercase font-bold text-xs text-center`}
                        >
                            {isAvailable ? 'No Disponible':'Disponible'}
                        </button>
                    </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex justify-between gap-3">
                    <button
                        onClick={
                            /*navigate recibe dos parámetros y el segundo es opcional
                            url
                            options: puede ser un state, el cual vamos a recuperar nuevamente en la url a la que estamos redirigiendo al usuario
                            */
                            ()=>navigate(
                                
                                `/productos/${product.id}/editar`
                                // {
                                //     state:product
                                // }
                            )}
                        className="bg-indigo-600 text-white rounded-lg w-full p-3 uppercase font-bold text-xs text-center"
                    >Editar</button>
                    <Form 
                        className="w-full"
                        method="POST"
                        action={`/productos/${product.id}/eliminar`}
                        onSubmit={(e)=>{
                            if(!confirm('¿Estás seguro de eliminar este producto?')){
                                e.preventDefault()
                            }
                        }}
                        >
                            <input 
                                type="submit"
                                value="eliminar"
                                className="bg-red-600 p-3 w-full text-white rounded-lg uppercase font-bold text-xs text-center cursor-pointer"
                                />
                    </Form>
                </div>
            </td>
    </tr> 
    )
}
