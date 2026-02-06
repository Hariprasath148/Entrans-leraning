import { Component , input, output } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  standalone: false,
  templateUrl: './paragraph.html',
  styleUrl: './paragraph.css',
})
export class Paragraph {
  question = input<string>("");
  id = input<number>(-1);
  answerChange = output<any>();

  handleInput(e : Event):any {
    this.answerChange.emit({
      id : this.id(),
      question : this.question(),
      answer : (e.target as HTMLInputElement).value
    });
  }
}
