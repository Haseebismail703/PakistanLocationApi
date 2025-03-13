import { useState } from "react";
import { Card, Input, Button, Select, message, Spin } from "antd";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import userInterceptor from "../../Api/userInterceptor.js";

const PaymentPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const handlePayment = async () => {
    if (!amount || !currency) {
      message.error("Please enter amount and select currency.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Payment Intent
      const { data } = await userInterceptor.post("/payment/create-payment-intent", {
        amount,
        currency,
      });

      if (!data.data.clientSecret || !data.data.paymentIntentId) {
        message.error("Failed to initialize payment.");
        setLoading(false);
        return;
      }

      setPaymentIntentId(data.data.paymentIntentId); // Store paymentIntentId
      setStep(2); // Move to Step 2
      message.success("Payment initialized. Click 'Confirm Payment' to proceed.");
    } catch (error) {
      message.error("Payment initialization failed.");
    }

    setLoading(false);
  };

  const confirmPayment = async () => {
    if (!paymentIntentId) {
      message.error("No payment to confirm.");
      return;
    }

    setLoading(true);

    try {
      // Step 2: Confirm Payment Intent
      const { data: confirmData } = await userInterceptor.post("/payment/confirm-payment", {
        paymentIntentId,
        paymentMethodId: "pm_card_visa", // Dummy payment method ID
      });

      if (confirmData.success) {
        message.success("Payment successful!");
        setStep(1); // Reset back to step 1
        setPaymentIntentId("");
      } else {
        message.error("Payment confirmation failed.");
      }
    } catch (error) {
      message.error("Payment confirmation failed.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full p-6 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 ? "Step 1: Initiate Payment" : "Step 2: Confirm Payment"}
        </h2>

        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium">Amount</label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Currency</label>
              <Select value={currency} onChange={setCurrency} className="w-full">
                <Select.Option value="usd">USD</Select.Option>
                <Select.Option value="eur">EUR</Select.Option>
              </Select>
            </div>

            <CardElement className="p-3 border rounded-md mb-4" />

            <Button type="primary" className="w-full" onClick={handlePayment} loading={loading}>
              Pay Now
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center text-green-600">Payment initialized. Click below to confirm.</p>

            <Button type="primary" className="w-full mt-4" onClick={confirmPayment} loading={loading}>
              Confirm Payment
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default PaymentPage;
