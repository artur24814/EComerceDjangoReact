import React from 'react'
import { Card, Button, Badge } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartCtx"

const StoreItem = ({item}) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(item.id)
    return (
        <Card>
            <Card.Img variant='top' src={item.image} height='400px' style={{ objectFit: "cover" }} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{item.title}</span>
                    <span className="ms-2 text-muted">{item.price}</span>
                </Card.Title>
                <div className="d-flex justify-content-center align-items-baseline mb-4">
                    {item.sizes.map(item => (
                        <h4>
                            <Badge key={item} bg="light" text="dark" className='ms-1'>
                                {item}
                            </Badge>
                        </h4>
                    ))}
                </div>
                <div className='mt-auto'>
                    {quantity === 0 ? (<Button className='w-100' onClick={() => increaseCartQuantity(item.id, item.price, item.image, item.title) }>+ Add To Cart</Button>) 
                    :(
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }} >
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }} >
                                <Button className='btn-light btn-sm' onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                                    <div>
                                        <span className="fs-3">{quantity}</span> in cart
                                    </div>
                                <Button className='btn-light btn-sm' onClick={() => increaseCartQuantity(item.id, item.price, item.image, item.title)}>+</Button>
                            </div>
                            <Button onClick={() => removeFromCart(item.id)} variant="danger" size="sm" >
                                Remove
                            </Button>
                        </div>
                    )  
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem