import AddLink from "@/components/addLink/AddLink";
import ProcessOrder from "@/components/processOrder/ProcessOrder";
import Stepper from "@/components/stepper/Stepper";
import { orderStepper } from "@/constants/orders";

const pages = [<AddLink key={0} />, <ProcessOrder key={1} />];

const Order = () => {
  return (
    <div className="h-screen w-full">
      <Stepper data={orderStepper} pages={pages} />
    </div>
  );
};

export default Order;
