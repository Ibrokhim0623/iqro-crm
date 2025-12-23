import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
} from "lucide-react";

const studentsData = {
  "1": {
    id: "1",
    name: "Ali Valiyev",
    phone: "+998901234567",
    email: "ali.valiyev@gmail.com",
    group: "Ingliz tili A1",
    balance: -300000,
    status: "active",
    registeredDate: "2024-09-15",
    address: "Toshkent sh., Yunusobod tumani",
    parentPhone: "+998901111111",
    exams: [
      {
        id: 1,
        name: "Midterm Test",
        date: "2024-10-15",
        score: 85,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 2,
        name: "Grammar Quiz",
        date: "2024-10-20",
        score: 92,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 3,
        name: "Speaking Test",
        date: "2024-11-01",
        score: 78,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 4,
        name: "Final Exam",
        date: "2024-11-10",
        score: 65,
        maxScore: 100,
        status: "failed",
      },
    ],
    payments: [
      {
        id: 1,
        amount: 400000,
        date: "2024-10-01",
        status: "paid",
        month: "Oktyabr",
      },
      {
        id: 2,
        amount: 400000,
        date: "2024-11-01",
        status: "pending",
        month: "Noyabr",
      },
    ],
    attendance: [
      { id: 1, date: "2024-11-01", status: "present" },
      { id: 2, date: "2024-11-04", status: "present" },
      { id: 3, date: "2024-11-06", status: "absent" },
      { id: 4, date: "2024-11-08", status: "present" },
      { id: 5, date: "2024-11-11", status: "late" },
      { id: 6, date: "2024-11-13", status: "present" },
    ],
  },
  "2": {
    id: "2",
    name: "Malika Karimova",
    phone: "+998902345678",
    email: "malika.k@gmail.com",
    group: "Matematika",
    balance: 0,
    status: "active",
    registeredDate: "2024-08-20",
    address: "Toshkent sh., Mirobod tumani",
    parentPhone: "+998902222222",
    exams: [
      {
        id: 1,
        name: "Algebra Test",
        date: "2024-10-10",
        score: 95,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 2,
        name: "Geometry Quiz",
        date: "2024-10-25",
        score: 88,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 3,
        name: "Monthly Test",
        date: "2024-11-05",
        score: 92,
        maxScore: 100,
        status: "passed",
      },
    ],
    payments: [
      {
        id: 1,
        amount: 350000,
        date: "2024-10-01",
        status: "paid",
        month: "Oktyabr",
      },
      {
        id: 2,
        amount: 350000,
        date: "2024-11-01",
        status: "paid",
        month: "Noyabr",
      },
    ],
    attendance: [
      { id: 1, date: "2024-11-01", status: "present" },
      { id: 2, date: "2024-11-04", status: "present" },
      { id: 3, date: "2024-11-06", status: "present" },
      { id: 4, date: "2024-11-08", status: "present" },
      { id: 5, date: "2024-11-11", status: "present" },
      { id: 6, date: "2024-11-13", status: "present" },
    ],
  },
  "3": {
    id: "3",
    name: "Sardor Rahimov",
    phone: "+998903456789",
    email: "sardor.r@gmail.com",
    group: "Ingliz tili B1",
    balance: 150000,
    status: "active",
    registeredDate: "2024-07-10",
    address: "Toshkent sh., Chilonzor tumani",
    parentPhone: "+998903333333",
    exams: [
      {
        id: 1,
        name: "Reading Test",
        date: "2024-10-12",
        score: 90,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 2,
        name: "Writing Test",
        date: "2024-10-19",
        score: 85,
        maxScore: 100,
        status: "passed",
      },
      {
        id: 3,
        name: "Listening Test",
        date: "2024-11-02",
        score: 88,
        maxScore: 100,
        status: "passed",
      },
    ],
    payments: [
      {
        id: 1,
        amount: 500000,
        date: "2024-09-15",
        status: "paid",
        month: "Sentyabr",
      },
      {
        id: 2,
        amount: 500000,
        date: "2024-10-15",
        status: "paid",
        month: "Oktyabr",
      },
    ],
    attendance: [
      { id: 1, date: "2024-11-01", status: "present" },
      { id: 2, date: "2024-11-04", status: "late" },
      { id: 3, date: "2024-11-06", status: "present" },
      { id: 4, date: "2024-11-08", status: "present" },
      { id: 5, date: "2024-11-11", status: "present" },
      { id: 6, date: "2024-11-13", status: "absent" },
    ],
  },
};

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const student = studentsData[id as keyof typeof studentsData];

  if (!student) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-default)] mb-2">
            O'quvchi topilmadi
          </h2>
          <button
            onClick={() => navigate("/students")}
            className="text-blue-600 hover:text-blue-800"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const avgScore =
    student.exams.reduce((sum, exam) => sum + exam.score, 0) /
    student.exams.length;
  const passedExams = student.exams.filter((e) => e.status === "passed").length;
  const attendanceRate =
    (student.attendance.filter((a) => a.status === "present").length /
      student.attendance.length) *
    100;

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/students")}
          className="flex items-center gap-2 text-gray-600 hover:text-[var(--text-default)] mb-4 cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span>Orqaga</span>
        </button>

        <div className="bg-[var(--bg)] border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={40} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-default)]">
                  {student.name}
                </h1>
                <p className="text-gray-600">{student.group}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Phone size={14} />
                    {student.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={14} />
                    {student.email}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  student.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {student.status === "active" ? "Faol" : "Nofaol"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500">O'rtacha ball</p>
              <p className="text-2xl font-bold text-blue-600">
                {avgScore.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Imtihonlar</p>
              <p className="text-2xl font-bold text-green-600">
                {passedExams}/{student.exams.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Davomat</p>
              <p className="text-2xl font-bold text-purple-600">
                {attendanceRate.toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Balans</p>
              <p
                className={`text-2xl font-bold ${
                  student.balance < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {student.balance < 0 ? "-" : "+"}
                {Math.abs(student.balance / 1000).toFixed(0)}k
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[var(--bg)] border border-gray-200 rounded-lg mb-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium ${
              activeTab === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-[var(--text-default)]"
            }`}
          >
            Umumiy ma'lumot
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`px-6 py-3 font-medium ${
              activeTab === "exams"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-[var(--text-default)]"
            }`}
          >
            Imtihonlar
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-6 py-3 font-medium ${
              activeTab === "payments"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-[var(--text-default)]"
            }`}
          >
            To'lovlar
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={`px-6 py-3 font-medium ${
              activeTab === "attendance"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-[var(--text-default)]"
            }`}
          >
            Davomat
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-[var(--bg)] border border-gray-200 rounded-lg p-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-default)] mb-4">
                Shaxsiy ma'lumotlar
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">To'liq ismi:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Telefon:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Manzil:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.address}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ota-ona tel:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.parentPhone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ro'yxatdan o'tgan:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {new Date(student.registeredDate).toLocaleDateString("ru")}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-default)] mb-4">
                O'qish ma'lumotlari
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Guruh:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.group}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">O'rtacha ball:</span>
                  <span className="font-medium text-blue-600">
                    {avgScore.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jami imtihonlar:</span>
                  <span className="font-medium text-[var(--text-default)]">
                    {student.exams.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">O'tgan imtihonlar:</span>
                  <span className="font-medium text-green-600">
                    {passedExams}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Davomat:</span>
                  <span className="font-medium text-purple-600">
                    {attendanceRate.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balans:</span>
                  <span
                    className={`font-medium ${
                      student.balance < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {student.balance < 0 ? "-" : "+"}
                    {Math.abs(student.balance).toLocaleString("ru")} so'm
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "exams" && (
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-default)] mb-4">
              Imtihon natijalari
            </h3>
            <div className="space-y-4">
              {student.exams.map((exam) => (
                <div
                  key={exam.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {exam.status === "passed" ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <XCircle className="text-red-500" size={24} />
                      )}
                      <div>
                        <h4 className="font-semibold text-[var(--text-default)]">
                          {exam.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {new Date(exam.date).toLocaleDateString("ru")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-2xl font-bold ${
                          exam.status === "passed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {exam.score}
                      </p>
                      <p className="text-sm text-gray-500">/ {exam.maxScore}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          exam.status === "passed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${(exam.score / exam.maxScore) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-default)] mb-4">
              To'lovlar tarixi
            </h3>
            <div className="space-y-3">
              {student.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100"
                >
                  <div>
                    <p className="font-medium text-[var(--text-default)]">
                      {payment.month} oyi
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString("ru")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        payment.status === "paid"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {payment.amount.toLocaleString("ru")} so'm
                    </p>
                    <p
                      className={`text-xs ${
                        payment.status === "paid"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {payment.status === "paid" ? "To'langan" : "Kutilmoqda"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-default)] mb-4">
              Davomat
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {student.attendance.map((record) => (
                <div
                  key={record.id}
                  className={`p-3 rounded-lg text-center ${
                    record.status === "present"
                      ? "bg-green-100 border border-green-300"
                      : record.status === "absent"
                      ? "bg-red-100 border border-red-300"
                      : "bg-yellow-100 border border-yellow-300"
                  }`}
                >
                  <p className="text-xs text-gray-600 mb-1">
                    {new Date(record.date).toLocaleDateString("ru", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      record.status === "present"
                        ? "text-green-700"
                        : record.status === "absent"
                        ? "text-red-700"
                        : "text-yellow-700"
                    }`}
                  >
                    {record.status === "present"
                      ? "✓"
                      : record.status === "absent"
                      ? "✗"
                      : "⏰"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-gray-600">Kelgan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-gray-600">Kelmagan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
                <span className="text-gray-600">Kech kelgan</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;
