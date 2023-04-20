import { Button, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartCtx"
import { Link } from 'react-router-dom';
import CartItem from "./CartItem"

export function ShoppingCart({ isOpen }){
    const { closeCart, cartItems, totalPrice } = useShoppingCart()

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
                        <CartItem key={item.id} itemId={item.id} image={item.image} price={item.price} quantity={item.quantity} title={item.title} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "} 
                        {totalPrice.toFixed(2)} $
                    </div>
                    <Link to='/checkout'>
                        <Button>Checkout</Button>
                    </Link>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
