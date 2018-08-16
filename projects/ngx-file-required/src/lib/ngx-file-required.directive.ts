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

  /**
   * @type {HTMLFileInputAttribute}
   * @public
   */
  public get required(): HTMLFileInputAttribute {
    return this._required || this._element.nativeElement.hasAttribute('required');
  }

  /**
   * @param {HTMLFileInputAttribute} value
   * @public
   */
  public set required(value: HTMLFileInputAttribute) {
    this._required = value || this._element.nativeElement.hasAttribute('required');
  }

  /**
   * @type {string}
   * @public
   */
  @Input()
  public requiredErrorMsg = 'File is required';

  /**
   * @return {boolean}
   * @public
   */
  @Input()
  public get multiple(): HTMLFileInputAttribute {
    return this._element.nativeElement.hasAttribute('multiple');
  }

  /**
   *
   * @param {any} value
   * @returns {void}
   */
  public set multiple(value: HTMLFileInputAttribute) {
    this._multiple = value === '' || !!value;
  }

  /**
   * @type {boolean}
   * @private
   */
  private _required = false;

  /**
   * @type {boolean}
   * @private
   */
  private _multiple = false;

  /**
   * @type {ElementRef}
   * @private
   */
  private _element: ElementRef;

  /**
   * @type {AbstractControl}
   * @private
   */
  private _control: AbstractControl;

  /**
   * @type {MutationObserver}
   * @private
   */
  private _mutationObserver: MutationObserver;

  /**
   *
   * @param {ElementRef} element
   * @return {void}
   * @public
   */
  public constructor(element: ElementRef) {
    this._element = element;
  }

  /**
   *
   * @return {void}
   * @public
   */
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

  /**
   *
   * @public
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this._mutationObserver.disconnect();
  }

  /**
   *
   * @return {void}
   * @param {SimpleChanges} changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (
      this.required &&
      (changes.requiredErrorMsg && !changes.requiredErrorMsg.firstChange)
    ) {
      this._setValidity(this._getInputValue(this._element.nativeElement as FileInputEventTarget));
    }
  }

  /**
   *
   * @param {FormControl} control
   * @return {ValidationErrors}
   * @private
   */
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

  /**
   *
   * @param {EventTarget} eventTarget
   * @return {void}
   */
  @HostListener('change', ['$event.target'])
  public onChange(eventTarget: EventTarget): void {
    const value: File|FileList|undefined = this._getInputValue(eventTarget as FileInputEventTarget);
    this._setValidity(value);
  }

  /**
   *
   * @param value
   * @private
   */
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

  /**
   *
   * @param {File|FileList|undefined} value
   * @return {boolean}
   * @private
   */
  private _hasError(value: File|FileList|undefined): boolean {
    return this.required && !this._hasValue(value);
  }

  /**
   *
   * @param {File|FileList} value
   * @return {boolean}
   * @private
   */
  private _hasValue(value: File|FileList|undefined): boolean {
    return this.multiple ?
      value instanceof FileList && !!value.length :
      value instanceof File;
  }

  /**
   *
   * @param {FileInputEventTarget} eventTarget
   * @return {File|FileList|undefined}
   * @private
   */
  private _getInputValue(eventTarget: FileInputEventTarget): File|FileList|undefined {
    return this.multiple ? eventTarget.files : eventTarget.files.item(0);
  }

}
