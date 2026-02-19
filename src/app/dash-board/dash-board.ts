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

  questions:any = {}; 

  constructor(private questionPaperServie : QuestionPaper) {}
  
  ngOnInit() {
    this.questionPaperServie.question$.subscribe(data=> {
      this.questions = data;
    });
  }

  getQuestion() {
    this.questionStatus = true;
    this.questionPaperServie.getAllQuestion();
    console.log("This is the fetched Quesitons =",this.questions);
  }

  setAnswer(e : any) {
    let res = this.questionPaperServie.setAnswer(e);
    if(!res) console.log("unable to update the question.");
  }

  sumitAnswer() {
    this.questionPaperServie.checkAnswer();
  }

 } 
