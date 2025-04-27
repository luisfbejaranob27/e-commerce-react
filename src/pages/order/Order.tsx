import { useContext, useState } from "react";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";
import { useNavigate } from "react-router-dom";
import { PaymentMethod } from "../../enums/PaymentMethod.ts";

export const Order = () =>
{
  const context = useContext(EcommerceContext);
  const { cartItems, confirmOrder } = useContext(EcommerceContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [errors, setErrors] = useState({ userId: "", address: "", paymentMethod: "" });
  const [showForm, setShowForm] = useState(false);

  const handleConfirmOrder = () =>
  {
    const newErrors = {
      userId: userId.trim() === "" ? "The ID is required" : "",
      address: address.trim() === "" ? "Address is required" : "",
      paymentMethod: ""
    };

    setErrors(newErrors);

    if (newErrors.userId || newErrors.address) {
      return;
    }

    confirmOrder(userId, address, paymentMethod);
    navigate("/my-orders");
  };

  const handleCancelOrder = () =>
  {
    if (confirm("¿Are you sure you want to cancel your order? All products will be removed from the cart.")) {
      navigate("/my-cart");
    }
  };

  const calculateTotal = () =>
  {
    return cartItems.reduce((total, item) => {
      return total + (item.item.price * item.quantity);
    }, 0);
  };

  const renderCartItem = () =>
  {
    return cartItems.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.item.name}</td>
        <td>{item.quantity}</td>
        <td>${item.item.price}</td>
        <td>${item.item.price * item.quantity}</td>
      </tr>
    ));
  };

  const paymentMethods = Object.values(PaymentMethod)
    .filter(value => !isNaN(Number(value)))
    .map(value => Number(value) as PaymentMethod);

  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>Order</h2>

          {cartItems.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                  </thead>
                  <tbody>
                  {renderCartItem()}
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colSpan={4} className="text-end fw-bold">Total</td>
                    <td>${calculateTotal()}</td>
                  </tr>
                  </tfoot>
                </table>
              </div>

              {!showForm ? (
                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button className="btn btn-secondary" onClick={() => navigate("/my-cart")}>
                    Return to cart
                  </button>
                  <button className="btn btn-danger" onClick={handleCancelOrder}>
                    Cancel order
                  </button>
                  <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    Continue
                  </button>
                </div>
              ) : (
                <div className="mt-4">
                  <h4>Shipping Information</h4>
                  <form className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="userId" className="form-label">ID</label>
                      <input
                        type="text"
                        className={`form-control ${errors.userId ? "is-invalid" : ""}`}
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your ID number"
                      />
                      {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="address" className="form-label">Mailing address</label>
                      <input
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter the shipping address"
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="paymentMethod" className="form-label">Payment method</label>
                      <select
                        className={`form-select ${errors.paymentMethod ? "is-invalid" : ""}`}
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(Number(e.target.value) as PaymentMethod)}
                      >
                        {paymentMethods.map((method) => (
                          <option key={method} value={method}>
                            {context.getPaymentMethodName(method)}
                          </option>
                        ))}
                      </select>
                      {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}
                    </div>

                    <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                        Return
                      </button>
                      <button type="button" className="btn btn-danger" onClick={handleCancelOrder}>
                        Cancel order
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleConfirmOrder}>
                        Confirm order
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="alert alert-info">
              There are no products in the cart to confirm. <a href="/" className="alert-link">Continue shopping</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
