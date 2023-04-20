import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartCtx"
import CartItem from "./CartItem"

export function ShoppingCart({ isOpen }){
    const { closeCart, cartItems } = useShoppingCart()

    return (
        <Offcanvas show={ isOpen } onHide={ closeCart } placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item=>(
                        <CartItem key={item.id} itemId={item.id} />
                    ))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
