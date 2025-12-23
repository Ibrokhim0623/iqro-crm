import { Popover } from "antd";

interface SidebarProfileProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

const getInitial = (name: string) => name.charAt(0).toUpperCase();

const ProfilePopover: React.FC<SidebarProfileProps> = ({ name, avatarUrl }) => {
  const content = (
    <div className="w-40">
      <div className="flex flex-col items-center">
        <p className="mt-1 text-base font-semibold text-[var(--text-default)]">
          Ibrohim Barnoyev
        </p>
        <p className="font-medium text-gray-500">Admin</p>
      </div>
    </div>
  );

  return (
    <Popover
      rootClassName="[&_.ant-popover-inner]:py-2!"
      content={content}
      trigger="click"
      placement="bottomRight"
    >
      <div className="relative cursor-pointer">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-11 h-11 rounded-full object-cover"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] flex items-center justify-center text-xl font-semibold text-black">
            {getInitial(name)}
          </div>
        )}

        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
      </div>
    </Popover>
  );
};

export default ProfilePopover;
