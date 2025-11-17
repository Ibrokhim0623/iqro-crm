import Dashboard from "@pages/dashboard/components";
import { rootPaths } from "./root-paths";
import Groups from "@pages/groups/components";
import Students from "@pages/students/components";
import StudentDetail from "@pages/students/components/students-detail";

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
    component: StudentDetail,
    path: `${rootPaths.STUDENTS}/:id`,
  },
];
