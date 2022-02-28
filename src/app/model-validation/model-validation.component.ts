import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { HighlightHtmlPipe } from "../html-highlight.pipe";

@Component({
  selector: "app-model-validation",
  templateUrl: "./model-validation.component.html",
})
export class ModelValidation {
  model = "<div><strong>test</strong></div>";
  formGroup: FormGroup;
  value: Map<string, string>;

  constructor(public fb: FormBuilder, protected highLightHtmlPipe: HighlightHtmlPipe, private sanitizer: DomSanitizer) {
    this.formGroup = fb.group({
      control: new FormControl("too long for validation"),
      matControl: new FormControl(""),
    });
  }

  extractContent(html) {
    return new DOMParser().parseFromString(html, "text/html").documentElement
      .textContent;
  }

  onBlurFunC(event) {
    const text = this.extractContent(this.formGroup.get("matControl").value);
    this.value = this.highLightHtmlPipe.transform(text, "X");
    const htmlContent = `<p> ${this.value.get("highlightedValue")} </p>`;
    this.model = `<div> ${this.value.get("highlightedValue")} </div>`
    this.formGroup.get("matControl").setValue(htmlContent.toString());
    const errorCount = this.value.get("totalErrorCount");
    console.log(this.formGroup);

  }

  byPassHTML(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

 
}
