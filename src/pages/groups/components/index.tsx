import { useGetGroups } from "../hooks";
import GroupsHeader from "./groups-header";
import GroupItem from "./group-item";
import CreateUpdateModal from "./create-update-modal";

const Groups = () => {
  const { data } = useGetGroups();

  return (
    <div className="w-full">
      <GroupsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((group) => (
          <GroupItem group={group} key={group?.id} />
        ))}
      </div>
      <CreateUpdateModal />
    </div>
  );
};

export default Groups;
