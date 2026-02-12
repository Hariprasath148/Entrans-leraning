import { Component , input, output } from '@angular/core';

@Component({
  selector: 'app-one-line',
  standalone: false,
  templateUrl: './one-line.html',
  styleUrl: './one-line.css',
})
export class OneLine {
  isSubmitted = input<boolean>(false);
  question = input<any>();
  answerChange = output<any>();

  handleInput(e : Event):any {
      this.answerChange.emit({
      id : this.question().id,
      answer : (e.target as HTMLInputElement).value,
      isAttended : (((e.target as HTMLInputElement).value).trim()).length !== 0
    });
  }
}
