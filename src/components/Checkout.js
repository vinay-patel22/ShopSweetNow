// src/components/Checkout.jsx
import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import DeliveryForm from "./DeliveryForm";
import PaymentOptions from "./PaymentOptions";
import StripePaymentForm from "./StripePaymentForm";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

const Checkout = () => {
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleDeliveryFormSubmit = (details) => {
    setDeliveryDetails(details);
  };

  const handlePaymentOptionSelect = (option) => {
    setPaymentOption(option);
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus("success");
  };

  const handlePaymentError = (message) => {
    setError(message);
    setPaymentStatus("failed");
  };

  return (
    <div className="checkout-container p-6 max-w-4xl mx-auto">
      <OrderSummary />

      {paymentStatus === null && (
        <>
          {!deliveryDetails ? (
            <DeliveryForm onSubmit={handleDeliveryFormSubmit} />
          ) : (
            <PaymentOptions onSelectPaymentOption={handlePaymentOptionSelect} />
          )}

          {paymentOption === "stripe" && deliveryDetails && (
            <StripePaymentForm
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </>
      )}

      {paymentStatus === "success" && <SuccessMessage />}
      {paymentStatus === "failed" && error && <ErrorMessage message={error} />}
    </div>
  );
};

export default Checkout;
