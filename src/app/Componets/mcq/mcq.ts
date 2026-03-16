import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mcq',
  standalone: false,
  templateUrl: './mcq.html',
  styleUrl: './mcq.css',
})
export class Mcq {
  isSubmitted = input<boolean>(false);
  question = input<any>();
  answerChange = output<any>();
  
  handleInput(e : Event):any {
    this.answerChange.emit({
      id : this.question().id,
      answerList :  [(e.target as HTMLInputElement).value],
      isAttended : true
    });
  }

}
