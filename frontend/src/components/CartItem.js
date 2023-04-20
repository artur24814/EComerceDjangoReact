import React, {useState, useEffect} from 'react'
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartCtx"

const CartItem = ({itemId, quantity}) => {
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
            <img src={item.image} style={{ width: "125px", height: "75px", objectFit: "cover" }} alt={item.id}/>
            <div className="me-auto">
                <div>
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                {item.price}
                </div>
            </div>
            <div> { item.price * quantity}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)} >
                &times;
            </Button>
        </Stack>
    )
}

export default CartItem