import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {NgControl} from "@angular/forms";

@Directive({
  standalone: true,
  selector: "[appMax]"
})
export class MaxDirective {

  @Input()
  max!: number
  constructor(private element: ElementRef, public model: NgControl) {}
  @HostListener("input", ["$event"])
  onEvent() {
    let value: number = this.element.nativeElement.value
    let newVal: any;
    if (value > this.max) {
      value = this.max;
    }
    newVal = value
    this.model?.control?.setValue(newVal)
  }
}
