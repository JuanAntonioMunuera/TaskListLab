import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mark-user]',
  standalone: true
})
export class MarkUserDirective implements OnChanges {
  @Input('mark-user') nombreUsuario: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.nombreUsuario) {
      this.el.nativeElement.style.backgroundColor = '';
      this.el.nativeElement.style.fontWeight = '';
      return;
    }

    const primeraLetra = this.nombreUsuario[0].toUpperCase();
    const vocales = ['A', 'E', 'I', 'O', 'U'];

    if (vocales.includes(primeraLetra)) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.backgroundColor = '';
      this.el.nativeElement.style.fontWeight = '';
    }
  }
}
