import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
  standalone: true
})
export class TaskStatusPipe implements PipeTransform {
  transform(completed: boolean): string {
    return completed ? '✅ Completada' : '❌ Pendiente';
  }
}
