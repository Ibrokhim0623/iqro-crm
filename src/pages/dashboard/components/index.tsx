import { useGetGroups } from "@pages/groups/hooks";
import { useGetPayments } from "@pages/payments/hooks";
import { useGetStudents } from "@pages/students/hooks";
import dayjs from "dayjs";
import { BookOpen, CreditCard, DollarSign, Users } from "lucide-react";

const Dashboard = () => {
  const { data: students } = useGetStudents();
  const { data: groups } = useGetGroups();
  const { data: payments } = useGetPayments();

  const filteredPayments = structuredClone(payments);

  const stats = {
    totalStudents: students?.length,
    activeGroups: groups?.length,
    monthlyRevenue: 12500000,
    debtors: students?.filter((s) => (s?.balance || 0) < 0).length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">
                Jami o'quvchilar
              </p>
              <p className="text-3xl font-bold text-blue-900 mt-2">
                {stats.totalStudents}
              </p>
            </div>
            <Users className="text-blue-500" size={40} />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Faol guruhlar
              </p>
              <p className="text-3xl font-bold text-green-900 mt-2">
                {stats.activeGroups}
              </p>
            </div>
            <BookOpen className="text-green-500" size={40} />
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">
                Oylik daromad
              </p>
              <p className="text-2xl font-bold text-purple-900 mt-2">
                {(stats.monthlyRevenue / 1000000).toFixed(1)}M
              </p>
            </div>
            <DollarSign className="text-purple-500" size={40} />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Qarzdorlar</p>
              <p className="text-3xl font-bold text-red-900 mt-2">
                {stats.debtors}
              </p>
            </div>
            <CreditCard className="text-red-500" size={40} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            So'nggi to'lovlar
          </h2>
          <div className="space-y-3">
            {filteredPayments?.splice(0, 3).map((payment, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {payment.student_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {dayjs(payment.payment_date).format("DD MMM")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    +{(payment.amount / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Bugungi darslar
          </h2>
          <div className="space-y-3">
            {[
              { group: "Ingliz tili A1", time: "14:00", teacher: "Nodira opa" },
              { group: "Matematika", time: "10:00", teacher: "Aziza opa" },
              {
                group: "Ingliz tili B1",
                time: "16:00",
                teacher: "Jahongir aka",
              },
            ].map((lesson, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-800">{lesson.group}</p>
                  <p className="text-sm text-gray-500">{lesson.teacher}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{lesson.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
