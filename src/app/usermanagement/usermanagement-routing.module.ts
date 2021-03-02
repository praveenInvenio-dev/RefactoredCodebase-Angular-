import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { TaskAllocationComponent } from "./task-allocation/task-allocation.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserdetailsComponent } from "./userdetails/userdetails.component";

const routes: Routes = [
  {
    path: "adduser",
    component: AddUserComponent,
  },
  {
    path: "taskallocation",
    component: TaskAllocationComponent,
  },
  {
    path: "",
    component: UserManagementComponent,
  },
  {
    path: "userdetails",
    component: UserdetailsComponent,
  },
  {
    path: "edituser",
    component: EditUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermanagementRoutingModule {}
