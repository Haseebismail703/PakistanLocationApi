import React, { useState, useEffect } from "react";
import { Steps, Spin, message  } from "antd"; // Ant Design Steps and Spin Import
import userInterceptor from '../../Api/userInterceptor.js'

const currencies = {
  usd: 1,
  PKR: 278,
  EUR: 0.91,
};

const PaymentPage = () => {
  const [selectedPlan, setSelectedPlan] = useState({
    name: "pro",
    amount: 50,
    requestsPerDay: "Unlimited",
    requestsPerMonth: "Unlimited",
    currency: "usd"
  });
  const [currency, setCurrency] = useState("usd");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await userInterceptor.post("/payment/create-payment-intent", {
        amount: selectedPlan.amount,
        currency: selectedPlan.currency,
      });
      if (res.data.data?.paymentIntentId) {
        setShowConfirmation(true);
        setPaymentData(res.data.data?.paymentIntentId);
        message.success(res.data.message)
      }
      console.log('Payment response:', res.data.data?.paymentIntentId);
    } catch (error) {
      message.error(error?.response.data?.message || "Payment  Error:");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPayment = async (e) => {
    e.preventDefault();
    if (!paymentData) {
      console.error("No payment intent ID found!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await userInterceptor.post("/payment/confirm-payment", {
        paymentIntentId: paymentData, // Make sure this is the correct ID
        paymentMethodId: "pm_card_visa",
      });
      if (res.data?.message) {
        setShowConfirmation(false);
        message.success(res.data?.message)
      }
      console.log("Payment Confirmed:", res.data);
    } catch (error) {
      setShowConfirmation(false);
      message.error(error?.response.data?.message || "Payment Confirmation Error:");
    } finally {
      setShowConfirmation(false);
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="mb-6 w-full max-w-4xl">
        <Steps 
          current={showConfirmation ? 1 : 0}
          items={[
            { title: <span className={theme === "dark" ? "text-white" : "text-black"}>Payment</span> },
            { title: <span className={theme === "dark" ? "text-white" : "text-black"}>Confirm Payment</span> },
          ]}
          progressDot={(dot, { status, index }) => (
            <span className={`ant-steps-icon ${status === 'process' ? 'bg-blue-500' : status === 'finish' ? 'bg-green-500' : 'bg-gray-300'}`}>
              {dot}
            </span>
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Payment Form */}
        {!showConfirmation ? (
          <div className={`p-6 rounded-2xl shadow-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
            <h2 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Payment</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>Full Name*</label>
                <input
                  name="fullName"
                  type="text"
                  required
                  className={`w-full p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                />
              </div>
              <div>
                <label className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>Card Number*</label>
                <input
                  name="cardNumber"
                  type="text"
                  required
                  className={`w-full p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>Exp Month*</label>
                  <input
                    name="expMonth"
                    type="text"
                    required
                    className={`w-full p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                  />
                </div>
                <div>
                  <label className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>Exp Year*</label>
                  <input
                    name="expYear"
                    type="text"
                    required
                    className={`w-full p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                  />
                </div>
                <div>
                  <label className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>CVC*</label>
                  <input
                    name="cvc"
                    type="password"
                    required
                    className={`w-full p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                  />
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg">
                {isLoading ? <Spin /> : "Pay Now"}
              </button>
            </form>
          </div>
        ) : (
          // Confirmation Card
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className={`p-8 rounded-2xl shadow-2xl w-96 text-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
              <h2 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>Confirm Payment</h2>

              <div className={`space-y-4 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Requests per Day:</span>
                  <span className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>{selectedPlan.requestsPerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span>Requests per Month:</span>
                  <span className={`font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>{selectedPlan.requestsPerMonth}</span>
                </div>
                <div className={`flex justify-between text-xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                  <span>Total amount:</span>
                  <span>
                    {(selectedPlan.amount * currencies[currency]).toFixed(2)} {currency}
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300"
                onClick={confirmPayment}
              >
                {isLoading ? <Spin /> : "Confirm Payment"}
              </button>
            </div>
          </div>
        )}

        {/* Summary Section */}
        {!showConfirmation && (
          <div className={`p-6 rounded-2xl shadow-xl ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
            <h2 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Summary</h2>
            <div className={`space-y-3 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              <div className="flex justify-between">
                <span>Plan</span>
                <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>Pro</span>
              </div>
              <div className="flex justify-between">
                <span>Requests per Day</span>
                <span className="text-green-400 font-semibold">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span>Requests per Month</span>
                <span className="text-green-400 font-semibold">Unlimited</span>
              </div>
              <div className={`flex justify-between text-xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                <span>Total amount</span>
                <span>
                  {(selectedPlan?.amount * currencies[currency]).toFixed(2)} {currency.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
