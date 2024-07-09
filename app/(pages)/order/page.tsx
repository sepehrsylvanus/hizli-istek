import AddLink from "@/components/addLink/AddLink";
import Stepper from "@/components/stepper/Stepper";
import { orderStepper } from "@/constants/orders";

const pages = [<AddLink key={0} />];

const Order = () => {
  return (
    <div className="h-screen w-full">
      <Stepper data={orderStepper} pages={pages} />
    </div>
  );
};

export default Order;
