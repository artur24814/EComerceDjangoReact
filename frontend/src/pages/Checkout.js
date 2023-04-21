import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../components/CheckoutForm";

import { Elements } from "@stripe/react-stripe-js";

import { useShoppingCart } from "../context/ShoppingCartCtx"

const Checkout = () => {

    const { totalPrice } = useShoppingCart()

    const [stripePromise, setStripePromise] = useState(null);

    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
       let publickKey = async () => {
        let response = await fetch('/api/config/');
        let data = await response.json();
        setStripePromise(loadStripe(data))
       }
       publickKey()
    }, [])

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({totalPrice})
        };

        let paymentKey = async () => {
            let response = await fetch('/api/payment/', requestOptions);
            let data = await response.json();
            setClientSecret(data)
           }
        paymentKey()
     }, [])

    return (
        <>
            <h1>Checkout</h1>
            <hr/>
            <h3>{totalPrice} $</h3>
            {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
            </Elements>
            )}
        </>
    )
}

export default Checkout