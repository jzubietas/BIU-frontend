import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[UpperCaseText]'
})
export class UpperCaseTextDirective {

  @Input('UpperCaseText') name: string;

  @HostListener('input', ['$event']) onKeyUp(event: any) {
    event.target['value'] = event.target['value'].toUpperCase();
  }

}
