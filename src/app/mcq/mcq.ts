import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mcq',
  standalone: false,
  templateUrl: './mcq.html',
  styleUrl: './mcq.css',
})
export class Mcq {
  choices = input([]);
  question = input("");
  answerChange = output<any>();
  id = input(0);

  handleInput(e : Event):any {
    this.answerChange.emit({
      id : this.id(),
      question : this.question(),
      answer : (e.target as HTMLInputElement).value
    });
  }

}
