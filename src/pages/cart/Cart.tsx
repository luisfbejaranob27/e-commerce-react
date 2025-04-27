import { Table } from "./components/table/Table.tsx";

export const Cart = () =>
{
  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>My Cart</h2>
          <Table />
        </div>
      </div>
    </div>
  )
}
