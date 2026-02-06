import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  choices = input([]);
  question = input("");
  answerChange = output<any>();
  id = input(0);
  answer:string[] = [];

  handleInput(e : Event):any {

    console.log(e)

    if((e.target as HTMLInputElement).checked) {
      this.answer.push((e.target as HTMLInputElement).value);
    }else {
      this.answer=this.answer.filter(a => a !== (e.target as HTMLInputElement).value);
    }

    this.answerChange.emit({
      id : this.id(),
      question : this.question(),
      answer : this.answer
    });
  }
}
