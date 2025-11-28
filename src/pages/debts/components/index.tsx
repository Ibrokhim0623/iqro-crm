import { useState } from "react";
import DebtsTable from "./debts-table";
import DebtsHeader from "./debts-header";
import DebtsCards from "./debts-cards";

const DebtsPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col p-4">
      <DebtsHeader setSearch={setSearch} setSelectedGroup={setSelectedGroup} />
      <DebtsCards />
      <DebtsTable search={search} selectedGroup={selectedGroup} />
    </div>
  );
};

export default DebtsPage;
