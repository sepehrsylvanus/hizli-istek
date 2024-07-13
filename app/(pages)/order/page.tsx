import AddLink from "@/components/addLink/AddLink";
import Address from "@/components/adress/Address";
import ConfirmProd from "@/components/confirmProd/ConfirmProduct";
import Payment from "@/components/payment/Payment";
import ProcessOrder from "@/components/processOrder/ProcessOrder";
import Stepper from "@/components/stepper/Stepper";
import { orderStepper } from "@/constants/orders";

const pages = [
  <AddLink key={0} />,
  <ProcessOrder key={1} />,
  <ConfirmProd key={2} />,
  <Address key={3} />,
  <Payment key={4} />,
];

const Order = () => {
  return (
    <div className="h-screen w-full">
      <Stepper data={orderStepper} pages={pages} />
    </div>
  );
};

export default Order;
