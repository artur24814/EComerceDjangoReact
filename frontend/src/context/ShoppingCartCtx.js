import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ShopingCartCtx = createContext({})

export function useShoppingCart () {
    return useContext(ShopingCartCtx)
}

export function ShoppingCartProvider( {children} ){
    const [cartItems, setCartItems] = useLocalStorage('shopping-cart', [])
    const [isOpen, setIsOpen] = useState(false) 

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const totalPrice = cartItems.reduce(
        // (parseFloat(sumaryTotal.innerHTML) + parseFloat(price)).toFixed(2)
        (total, item) => parseFloat(item.quantity * item.price) + total, 0
    )

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id, price, image, title){
        setCartItems(currItems => {
            if (currItems.find(item => item.id ===id) == null) {
                return [...currItems, {id, quantity: 1, image: image, price: price, title: title}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity +1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id){
        setCartItems(currItems => {
            if (currItems.find(item => item.id ===id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShopingCartCtx.Provider 
            value={{
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart, 
                cartItems, 
                cartQuantity,
                totalPrice,
                }}>
                {children}
                <ShoppingCart isOpen={isOpen} />
        </ShopingCartCtx.Provider>
    )
}