import { Directive, HostListener, HostBinding, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private eleRef : ElementRef){}
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

    // @HostListener('document:click',['$event']) toggleOpen (event:Event){
    //   console.log('Coming from directive');
    //   console.log(this.eleRef);
    //   console.log(this.eleRef.nativeElement);
    //   this.isOpen = this.eleRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    // }
}
