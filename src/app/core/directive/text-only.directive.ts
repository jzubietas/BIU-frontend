import {Directive, HostListener} from "@angular/core";

@Directive({
    standalone: true,
    selector: "[onlyText]"
})
export class TextOnlyDirective {

    private reg = /^[a-zA-Z\u00C0-\u017F\s]+$/;

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
        const pasteData = event.clipboardData.getData("text/plain").replace(/[0-9]/g, "");
        document.execCommand("insertHTML", false, pasteData)
    }

}
