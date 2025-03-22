import { Directive, HostListener } from "@angular/core";

@Directive({
	selector: "[onlyNumber]",
	standalone: true
})
export class NumbersOnlyDirective {
	private reg = "^[0-9]+$";
	
	@HostListener("keypress", ["$event"])
	onKeyPress(event: any) {
		return new RegExp(this.reg).test(event.key);
	}
	
	@HostListener("paste", ["$event"])
	blockPaste(event: any) {
		this.validateFields(event);
	}
	
	validateFields(event: ClipboardEvent) {
		event.preventDefault();
		const pasteData = event.clipboardData.getData("text/plain").replace(/[^0-9]/g, "");
		document.execCommand("insertHTML", false, pasteData)
	}
	
}

