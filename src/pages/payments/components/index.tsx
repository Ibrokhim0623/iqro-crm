import CreateUpdatePayment from "./create-update-payment";
import PaymentsHeader from "./payments-header";
import PaymentsTable from "./payments-table";

const Payments = () => {
  return (
    <div className="w-full">
      <PaymentsHeader />
      <PaymentsTable />

      <CreateUpdatePayment />
    </div>
  );
};

export default Payments;
