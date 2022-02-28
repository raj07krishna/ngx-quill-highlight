import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightHtml'
})
export class HighlightHtmlPipe implements PipeTransform {

  highlightedObject: Map<string, string>;
  val: string;
  transform(value: string, args: string): Map<string,string> {
    let regex;
    const invalidvalues = new Set<string>();
    if (args === 'X') {
      regex = new RegExp('[^0-9a-zA-Z:,/\'?.+\\-()\\r\\n *]', 'gm');
    } else if (args === 'Z') {
      regex = new RegExp('[^0-9a-zA-Z:,/\'?.+\\-()=@#&{};<>_!"%\\r\\n *]', 'gm');
    }
    const match = value.match(regex);
    if (!match) {
      return null;
    }
    const valueArray = value.split(' ');
    value = '';
    let totalErrorCount = 0;
    this.highlightedObject = new Map();
    valueArray.forEach(element => {
      let val = '';
      if (element.match(regex) && element.match(regex).length !== 0) {
        val = `<span class='highlight'>${element}</span>`;
      } else {
        val = element;
      }
      value += val + ' ';
    });
    value.trim();
    match.forEach(element => {
      if (!invalidvalues.has(element)) {
        value = value.split(element).join(`<font class='color-highlight'>${element}</font>`);
        invalidvalues.add(element);  
      }
    });
    this.val = value;
    totalErrorCount = this.val.split('</font>').length -1;
    this.highlightedObject.set('highlightedValue', value);
    this.highlightedObject.set('totalErrorCount', totalErrorCount.toString());
    return this.highlightedObject;
  }

}
