import { Card } from "antd";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import GroupCapacityWidget from "./group-capacity-widget";
import StatsCards from "./stats-cards";

export default function Dashboard() {
  const revenueData = [
    {
      id: "Revenue",
      data: [
        { x: "Jan", y: 2400 },
        { x: "Feb", y: 2800 },
        { x: "Mar", y: 2600 },
        { x: "Apr", y: 3100 },
        { x: "May", y: 3500 },
        { x: "Jun", y: 4200 },
      ],
    },
  ];

  const studentPie = [
    { id: "Active", label: "Active", value: 320 },
    { id: "Inactive", label: "Inactive", value: 80 },
    { id: "Debtors", label: "Debtors", value: 45 },
  ];

  return (
    <div className="h-full flex flex-col gap-4 overflow-auto p-4">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Line Chart */}
        <Card
          className="col-span-2 shadow rounded-xl"
          title="Revenue (Last 6 Months)"
        >
          <div className="h-80">
            <ResponsiveLine
              data={revenueData}
              margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto" }}
              colors={["#0077B6"]}
              pointSize={10}
              pointColor="#fff"
              pointBorderWidth={3}
              pointBorderColor={{ from: "serieColor" }}
              useMesh={true}
            />
          </div>
        </Card>

        {/* Students Pie Chart */}
        <Card className="shadow rounded-xl" title="Students Overview">
          <div className="h-80">
            <ResponsivePie
              data={studentPie}
              margin={{ top: 30, right: 10, bottom: 30, left: 10 }}
              innerRadius={0.55}
              padAngle={1.5}
              cornerRadius={4}
              activeOuterRadiusOffset={8}
              colors={["#00B4D8", "#90E0EF", "#0077B6"]}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLabelsTextColor="#fff"
              arcLinkLabelsTextColor="#03045E"
            />
          </div>
        </Card>
      </div>

      <Card className="shadow rounded-xl" title="Today's Classes">
        <GroupCapacityWidget />
      </Card>
    </div>
  );
}
