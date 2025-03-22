import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
    standalone: true,
    selector: "[AlfaNumeric]"
})
export class AlfaNumericDirective {

    private reg = /^[A-Za-z0-9-_/\s]+$/g;

    constructor(private _el: ElementRef) {
    }

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
        const pasteData = event.clipboardData.getData("text/plain").replace(/[^a-z0-9-_\s]+/gi, "");
        document.execCommand("insertHTML", false, pasteData)
    }

}
