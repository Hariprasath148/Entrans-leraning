import { Component , input, output } from '@angular/core';

@Component({
  selector: 'app-one-line',
  standalone: false,
  templateUrl: './one-line.html',
  styleUrl: './one-line.css',
})
export class OneLine {
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
