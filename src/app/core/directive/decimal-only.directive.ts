import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[DecimalOnly]',
	standalone: true
})
export class DecimalOnlyDirective {
	private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/); // Permite hasta 2 decimales
  constructor(private el: ElementRef) {
	}
	
	@HostListener('input', ['$event']) onInputChange(event: Event) {
		const input = event.target as HTMLInputElement;
		let value = input.value;
		
		// Reemplaza caracteres no numéricos excepto el punto
		value = value.replace(/[^0-9.]/g, '');
		
		// Verifica si es un número decimal válido
		if (!this.regex.test(value)) {
			value = value.substring(0, value.length - 1);
		}
		input.value = value;
	}
}
