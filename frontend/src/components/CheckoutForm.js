import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements =  useElements()

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsProcessing(true);
    
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `${window.location.origin}/completion`,
          },
          redirect: 'if_required'
        });
    
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);       
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment status: ' + paymentIntent.status + '🎉')
        } else {
          setMessage("An unexpected error occured.");
        }
    
        setIsProcessing(false);
      };

    return (
        <div className="form-body">
            <div className="form-main">
                <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" />
                <button className="button-pay" disabled={isProcessing || !stripe || !elements} id="submit">
                    <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
                </form>
            </div>
        </div>
      );
    }

export default CheckoutForm