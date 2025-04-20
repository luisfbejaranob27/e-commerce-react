import {Card} from "../../components/card/Card.tsx";

export const Home = () =>
{
  return (
    <div className="container-fluid neumorphism-div">
      <div className="row">
        <div className="col-12">
          <h2>List Products</h2>
          <div className="row">
            <div className="col-2">
              <Card name={"Test"} price={100} />
            </div>
            <div className="col-2">
              <Card name={"Test"} price={100} />
            </div>
            <div className="col-2">
              <Card name={"Test"} price={100} />
            </div>
            <div className="col-2">
              <Card name={"Test"} price={100} />
            </div>
            <div className="col-2">
              <Card name={"Test"} price={100} />
            </div>
            <div className="col-2">
              <Card name={"Test"} price={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
