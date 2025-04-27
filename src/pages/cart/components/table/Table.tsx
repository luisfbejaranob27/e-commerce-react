import { useContext } from "react";
import { EcommerceContext } from "../../../../contexts/EcommerceContext.ts";

export const Table = () =>
{
  const context = useContext(EcommerceContext);
  const { cartItems } = context;

  const total = cartItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0);

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Quantity</th>
        <th scope="col">price</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.item.price}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm"
                          onClick={() => context.updateCartItemQuantity(item, item.quantity + 1)}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                  <button className="btn btn-warning btn-sm"
                          onClick={() => context.updateCartItemQuantity(item, item.quantity - 1)}>
                    <i className="bi bi-dash-lg"></i>
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => context.removeFromCart(item)}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
      <tfoot>
      <tr>
        <td colSpan={3}>Total</td>
        <td colSpan={2}>{total}</td>
      </tr>
      </tfoot>
    </table>
  )
}
