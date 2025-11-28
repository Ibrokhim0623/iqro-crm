import CreateUpdateModal from "./create-update-modal";
import StudentsTable from "./students-table";
import StudentsHeader from "./students-header";

const Students = () => {
  return (
    <div className="flex flex-col p-4">
      <StudentsHeader />
      <StudentsTable />
      <CreateUpdateModal />
    </div>
  );
};

export default Students;
