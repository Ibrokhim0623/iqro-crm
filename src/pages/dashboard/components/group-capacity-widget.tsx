import { Card, Progress, Tag } from "antd";

const GroupCapacityWidget = () => {
  const groups = [
    { name: "IELTS A1", students: 15, capacity: 16 },
    { name: "IELTS Premium", students: 10, capacity: 12 },
    { name: "General English B1", students: 6, capacity: 16 },
    { name: "Speaking Club", students: 14, capacity: 16 },
    { name: "Kids English", students: 8, capacity: 12 },
  ];

  const getStatus = (s: number, c: number) => {
    const ratio = (s / c) * 100;

    if (ratio >= 85) return { text: "Almost Full", color: "green" };
    if (ratio >= 50) return { text: "Good", color: "blue" };
    return { text: "Low Capacity", color: "orange" };
  };

  return (
    <Card title="Group Capacity Overview" className="shadow rounded-xl">
      <div className="space-y-5">
        {groups.map((g, i) => {
          const percent = Math.round((g.students / g.capacity) * 100);
          const status = getStatus(g.students, g.capacity);

          return (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{g.name}</span>
                <Tag color={status.color}>{status.text}</Tag>
              </div>

              <Progress
                percent={percent}
                status="active"
                strokeColor={
                  status.color === "green"
                    ? "#00B4D8"
                    : status.color === "blue"
                    ? "#0077B6"
                    : "#ff9800"
                }
              />

              <div className="text-xs text-gray-500 mt-1">
                {g.students} / {g.capacity} students
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default GroupCapacityWidget;
