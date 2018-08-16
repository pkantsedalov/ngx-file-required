import {
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Directive,
  ElementRef,
  Input,
  HostListener
} from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

export type HTMLFileInputAttribute = any | boolean;
interface FileInputEventTarget extends EventTarget {
  files: FileList;
}

@Directive({
  selector: 'input[type="file"][attr.required][formControlName],input[type="file"][attr.required][formControl],input[type="file"][attr.required][ngModel],input[type="file"][required][formControlName],input[type="file"][required][formControl],input[type="file"][required][ngModel]',
  exportAs:  'ngxFileRequiredDirective',
  providers: [
    {
      provide:     NG_VALIDATORS,
      useExisting: NgxFileRequiredDirective,
      multi:       true
    }
  ]
})
export class NgxFileRequiredDirective implements Validator, OnInit, OnDestroy, OnChanges {

  public get required(): HTMLFileInputAttribute {
    return this._required || this._element.nativeElement.hasAttribute('required');
  }

  public set required(value: HTMLFileInputAttribute) {
    this._required = value || this._element.nativeElement.hasAttribute('required');
  }

  @Input()
  public requiredErrorMsg = 'File is required';

  @Input()
  public get multiple(): HTMLFileInputAttribute {
    return this._element.nativeElement.hasAttribute('multiple');
  }

  public set multiple(value: HTMLFileInputAttribute) {
    this._multiple = value === '' || !!value;
  }

  private _required = false;

  private _multiple = false;

  private _element: ElementRef;

  private _control: AbstractControl;

  private _mutationObserver: MutationObserver;

  public constructor(element: ElementRef) {
    this._element = element;
  }

  public ngOnInit(): void {
    this._mutationObserver = new MutationObserver((mutations: MutationRecord[]): void => {
      this._setValidity(this._getInputValue(this._element.nativeElement as FileInputEventTarget));
    });

    this._mutationObserver.observe(this._element.nativeElement, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['required']
    });
  }

  public ngOnDestroy(): void {
    this._mutationObserver.disconnect();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      this.required &&
      (changes.requiredErrorMsg && !changes.requiredErrorMsg.firstChange)
    ) {
      this._setValidity(this._getInputValue(this._element.nativeElement as FileInputEventTarget));
    }
  }

  public validate(control: AbstractControl): ValidationErrors {
    if (!this._control) {
      this._control = control;
    }

    if (this._hasError(this._control.value)) {
      return {
        required: this.requiredErrorMsg
      } as ValidationErrors;
    }
  }

  @HostListener('change', ['$event.target'])
  public onChange(eventTarget: EventTarget): void {
    const value: File|FileList|undefined = this._getInputValue(eventTarget as FileInputEventTarget);
    this._setValidity(value);
  }

  private _setValidity(value: File|FileList|undefined): void {
    const errors: ValidationErrors = Object.assign({}, this._control.errors);

    if (this._hasError(value)) {
      errors.required = this.requiredErrorMsg;
    } else {
      if (this._control.hasError('required')) {
        delete errors.required;
      }
    }

    this._control.setErrors(Object.keys(errors).length ? errors : null);
  }

  private _hasError(value: File|FileList|undefined): boolean {
    return this.required && !this._hasValue(value);
  }

  private _hasValue(value: File|FileList|undefined): boolean {
    return this.multiple ?
      value instanceof FileList && !!value.length :
      value instanceof File;
  }

  private _getInputValue(eventTarget: FileInputEventTarget): File|FileList|undefined {
    return this.multiple ? eventTarget.files : eventTarget.files.item(0);
  }

}
