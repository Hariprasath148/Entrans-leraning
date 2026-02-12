import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-question',
  standalone: false,
  templateUrl: './question.html',
  styleUrl: './question.css',
})
export class Question {
  isSubmitted = input<boolean>(false);
  getChildAnswer = output();
  question = input<any>();

  sendToParentAnswer(e : any) {
    this.getChildAnswer.emit(e);
  }
}
