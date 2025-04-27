import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EcommerceContext } from "../../contexts/EcommerceContext.ts";
import { CartItem } from "../../models/CartItem.ts";
import "./Orders.css";

export const Orders = () =>
{
  const { orders, getPaymentMethodName } = useContext(EcommerceContext);
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setOpenOrder(openOrder === index ? null : index);
  };

  const renderItems = (items: CartItem[]) =>
  {
    return items.map((item, idx) => (
      <tr key={idx}>
        <td>{item.item.name}</td>
        <td>{item.quantity}</td>
        <td>${item.item.price}</td>
        <td>${item.item.price * item.quantity}</td>
      </tr>
    ));
  }

  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>My Orders</h2>

          {orders.length > 0 ? (
            <div>
              <div className="accordion" id="ordersAccordion">
                {orders.map((order, index) => (
                  <div className="accordion-item" key={order.id}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#order${index}`}
                        onClick={() => handleAccordionClick(index)}
                      >
                        <span>Order #{index + 1}</span>
                        {openOrder !== index && (
                          <>
                            <span> - {order.orderDate.toLocaleDateString()} - ${order.totalPrice}</span>
                            <span className="badge bg-primary ms-2">{order.status}</span>
                          </>
                        )}
                      </button>
                    </h2>
                    <div
                      id={`order${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#ordersAccordion"
                    >
                      <div className="accordion-body">
                        <div className="mb-4">
                          <h3>Information:</h3>
                          <div className="row">
                            <div className="col-md-6">
                              <p><strong>ID:</strong> {order.userId}</p>
                            </div>
                            <div className="col-md-6">
                              <p><strong>Mailing address:</strong> {order.shippingAddress}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <p><strong>Order date:</strong> {order.orderDate.toLocaleString()}</p>
                            </div>
                            <div className="col-md-6">
                              <p><strong>State:</strong> <span className="badge bg-primary">{order.status}</span></p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <p><strong>Payment method:</strong> {getPaymentMethodName(order.paymentMethod)}</p>
                            </div>
                            <div className="col-md-6">
                              <p><strong>Total:</strong> <span className="fw-bold">${order.totalPrice}</span></p>
                            </div>
                          </div>
                        </div>

                        <h3>Items:</h3>
                        <div className="table-responsive">
                          <table className="table table-striped">
                            <thead>
                            <tr>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Unit price</th>
                              <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {renderItems(order.items)}
                            </tbody>
                            <tfoot>
                            <tr>
                              <td colSpan={3} className="text-end fw-bold">Total</td>
                              <td className="fw-bold">${order.totalPrice}</td>
                            </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              You have no confirmed orders. <Link to="/" className="alert-link">¡Continue shopping!</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
