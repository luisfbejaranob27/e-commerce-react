import { useContext } from "react";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";
import { useNavigate } from "react-router-dom";

export const Cart = () =>
{
  const context = useContext(EcommerceContext);
  const navigate = useNavigate();

  const calculateTotal = () =>
  {
    return context.cartItems.reduce((total, item) => {
      return total + (item.item.price * item.quantity);
    }, 0);
  };

  const handleProceedToOrder = () =>
  {
    navigate("/my-order");
  };

  const renderCartItem = () => {
    return context.cartItems.map((item, index) => (
      <tr key={index}>
        <td>
          <img
            src={item.item.imageUrl}
            alt={item.item.name}
            style={{ width: '50px', height: '50px' }}
            className="img-thumbnail"
          />
        </td>
        <td>{item.item.name}</td>
        <td>${item.item.price}</td>
        <td>{item.quantity}</td>
        <td>${item.item.price * item.quantity}</td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => context.updateCartItemQuantity(item, item.quantity + 1)}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => context.updateCartItemQuantity(item, item.quantity - 1)}
            >
              <i className="bi bi-dash-lg"></i>
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => context.removeFromCart(item)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>Cart</h2>

          {context.cartItems.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {renderCartItem()}
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colSpan={4} className="text-end fw-bold">Total</td>
                    <td>${calculateTotal()}</td>
                    <td></td>
                  </tr>
                  </tfoot>
                </table>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-primary" onClick={handleProceedToOrder}>
                  Continue with the order
                </button>
              </div>
            </>
          ) : (
            <div className="alert alert-info">
              Your cart is empty. <a href="/" className="alert-link">¡Continue shopping!</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
