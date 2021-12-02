import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Directive({
  selector: '[appDoneTyping]',
})
export class DoneTypingDirective {
  //This directive can output when the user is "done" typing
  @Output() doneTyping = new EventEmitter();

  @Input() doneTypingDelayMS: number = 3000;

  //Inject the element reference that this directive was applied to
  constructor(private eRef: ElementRef){}

  ngOnInit(){
    fromEvent(this.eRef.nativeElement, 'keyup')  //listen for the "keyup" events on the element this directive was applied to
    .pipe(map((evt: any) => {
      return evt.target.value //Specifically get the value so we know whether the user is modifying the value
    }))
    .pipe(debounceTime(this.doneTypingDelayMS)) //wait 3000ms between "keyup" events
    .pipe(distinctUntilChanged()) //if the value changes, restart because the person is not done typing
    .subscribe(() => {
      this.doneTyping.next(); //they're done typing!
    });
  }
}
