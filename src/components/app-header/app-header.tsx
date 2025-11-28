import { BellOutlined } from "@ant-design/icons";
import ProfilePopover from "./profile-popover";

interface AppHeaderProps {
  title?: string;
}

const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <div className="h-16! bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-5">
        <BellOutlined className="text-gray-500 text-xl cursor-pointer" />

        <ProfilePopover name="Ibrohim Barnoyev" role="Admin" />
      </div>
    </div>
  );
};

export default AppHeader;
