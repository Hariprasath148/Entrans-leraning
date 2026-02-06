import { Component } from '@angular/core';
import { QuestionPaper } from '../service/question-paper';

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard {
  questionStatus = false;

  questions:any[] = []; 
  answer:any = {};

  constructor(private questionPaperServie : QuestionPaper) {}
  
  getQuestion() {
    this.questionStatus = true;
    this.questionPaperServie.getAllQuestion().subscribe(res=> {
      this.questions.push(res);
    })
    //this.questions = this.questionPaperServie.getAllQuestion().questions;
    console.log("This is the fetched Quesitons =",this.questions);
  }

  setAnswer(e : any) {
    this.answer[e.id] = {
      question  : e.question,
      answer : e.answer
    }
  }

  sumitAnswer() {
    console.log(this.answer);
  }

 } 
