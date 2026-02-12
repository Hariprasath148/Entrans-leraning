import { Component , input, output } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  standalone: false,
  templateUrl: './paragraph.html',
  styleUrl: './paragraph.css',
})
export class Paragraph {
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
