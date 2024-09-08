// src/components/StripePaymentForm.jsx
import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const StripePaymentForm = ({ onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    // Request to your backend to create the payment intent
    const res = await fetch("http://localhost:3001/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // Replace with actual amount
    });

    const { clientSecret } = await res.json();

    // Confirm card payment
    const cardElement = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentResult.error) {
      onError(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        onSuccess();
      }
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="stripe-payment-form bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out mt-4"
      >
        Pay Now
      </button>
    </form>
  );
};

export default StripePaymentForm;
