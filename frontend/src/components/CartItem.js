import React from 'react'
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartCtx"

const CartItem = ({itemId, image, price, quantity, title}) => {
    const { removeFromCart } = useShoppingCart()

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={image} style={{ width: "125px", height: "75px", objectFit: "cover" }} alt={itemId}/>
            <div className="me-auto">
                <div>
                    {title}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                {price}
                </div>
            </div>
            <div> { parseFloat(price * quantity).toFixed(2)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(itemId)} >
                &times;
            </Button>
        </Stack>
    )
}

export default CartItem