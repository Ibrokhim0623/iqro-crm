import Dashboard from "@pages/dashboard/components";
import { rootPaths } from "./root-paths";
import Groups from "@pages/groups/components";
import Students from "@pages/students/components";
import StudentDetail from "@pages/students/components/students-detail";
import Payments from "@pages/payments/components";
import DebtsPage from "@pages/debts/components";

export const rootRoutes = [
  {
    component: Dashboard,
    path: rootPaths.INDEX,
  },
  {
    component: Groups,
    path: rootPaths.GROUPS,
  },
  {
    component: Students,
    path: rootPaths.STUDENTS,
  },
  {
    component: Payments,
    path: rootPaths.PAYMENTS,
  },
  {
    component: DebtsPage,
    path: rootPaths.DEBTS,
  },
  {
    component: StudentDetail,
    path: `${rootPaths.STUDENTS}/:id`,
  },
];
