import React, {useState, useEffect} from 'react'
import { Stack } from 'react-bootstrap'
import { useShoppingCart } from "../context/ShoppingCartCtx"
import StoreItem from "./StoreItem"

const CartItem = ({itemId}) => {
    const { removeFromCart } = useShoppingCart()

    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    let getProducts = async() => {
        let responce = await fetch('/api/products')
        let data = await responce.json()
        console.log('DATA:', data)
        setProducts(data)
    }

    const item = products.find(i => i.id === itemId)
    if (item == null) return null
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                src={item.image}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
        </Stack>
    )
}

export default CartItem