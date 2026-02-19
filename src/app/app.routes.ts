import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TaskList } from './pages/task-list/task-list';
import { TaskDetail } from './pages/task-detail/task-detail';
import { AddTask } from './pages/add-task/add-task';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tasks', component: TaskList },
  { path: 'tasks/:id', component: TaskDetail },
  { path: 'tasks/:id/edit', component: TaskDetail }, 
  { path: 'add-task', component: AddTask }
];