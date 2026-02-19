import { MarkUserDirective } from './mark-user';
import { ElementRef } from '@angular/core';

describe('MarkUserDirective', () => {
  it('should create an instance', () => {
    const directive = new MarkUserDirective({ nativeElement: document.createElement('span') } as ElementRef);
    expect(directive).toBeTruthy();
  });
});