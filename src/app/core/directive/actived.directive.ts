import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appActived]'
})
export class ActivedDirective implements OnInit {

  @Input('appActived') name: string;
  user: any;
  

  ngOnInit(): void {
    let services = this.user?.funcionalidades ?? [];
    let response: boolean = false;
    if(services.length > 0) {
      for (let item of services) {
        if(item.noM_FUNCIONALIDAD === this.name){
          response = true;
          break;
        }
        for (let item2 of item.childs) {
          if(item2.noM_FUNCIONALIDAD === this.name){
            response = true;
            break;
          }
          for (let item3 of item2.childs){
            if(item3.noM_FUNCIONALIDAD === this.name){
              response = true;
              break;
            }
          }
        }
      }
    }
    if (!response) {
      //this.element.nativeElement.style.display = 'none';
    }
  }

}
