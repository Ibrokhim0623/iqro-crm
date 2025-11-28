import CreateUpdatePayment from "./create-update-payment";
import PaymentsHeader from "./payments-header";
import PaymentsTable from "./payments-table";

const Payments = () => {
  return (
    <div className="flex flex-col p-4">
      <PaymentsHeader />
      <PaymentsTable />

      <CreateUpdatePayment />
    </div>
  );
};

export default Payments;
