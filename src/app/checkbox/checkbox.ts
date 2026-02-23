import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class Checkbox {
  isSubmitted = input<boolean>(false);
  question = input<any>();
  answerChange = output<any>();
  answer:string[] = [];
  
  ngOnInit() {
    this.answer = this.question().answerList;
  }
  
  handleInput(e : Event):any {

    if((e.target as HTMLInputElement).checked) {
      this.answer.push((e.target as HTMLInputElement).value);
    }else {
      this.answer=this.answer.filter(a => a !== (e.target as HTMLInputElement).value);
    }

    this.answerChange.emit({
      id : this.question().id,
      answerList : this.answer,
      isAttended : this.answer.length !== 0
    });
  }
}
