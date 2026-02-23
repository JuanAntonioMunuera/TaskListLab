import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mark-user]',
  standalone: true
})
export class MarkUserDirective implements OnChanges {
  @Input('mark-user') nombreUsuario: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.nombreUsuario) {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
      return;
    }

    const primeraLetra = this.nombreUsuario[0].toUpperCase();
    const vocales = ['A', 'E', 'I', 'O', 'U'];

    if (vocales.includes(primeraLetra)) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
    }
  }
}