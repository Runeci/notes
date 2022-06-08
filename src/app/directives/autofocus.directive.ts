import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  constructor(private elementRef: ElementRef) { };

  public ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
