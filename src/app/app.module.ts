import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component'

import { MatFormFieldModule } from '@angular/material/form-field'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatQuillModule } from './mat-quill/mat-quill-module'
import { ModelValidation } from './model-validation/model-validation.component'
import { HighlightHtmlPipe } from './html-highlight.pipe'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ModelValidation,
    HighlightHtmlPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    QuillModule.forRoot({
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    MatQuillModule,
  ],
  providers: [HighlightHtmlPipe],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
