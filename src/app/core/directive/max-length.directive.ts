import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {NgControl} from "@angular/forms";

@Directive({
  selector: "[appMaxLength]"
})
export class MaxLengthDirective {

  @Input()
  maxLength!: number
  constructor(private element: ElementRef, public model: NgControl) {}
  @HostListener("input", ["$event"])
  onEvent() {
    let value: string = this.element.nativeElement.value
    let newVal: any;
    if (value.length > this.maxLength) {
      value = value.slice(0, this.maxLength - value.length)
    }
    newVal = value
    this.model?.control?.setValue(newVal)
  }
}
