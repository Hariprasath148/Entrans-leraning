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
    this.questionPaperServie.setAnswer(e);
  }

  sumitAnswer() {
    this.questionPaperServie.checkAnswer();
  }

 } 
