import { ChangeDetectorRef, Component } from '@angular/core';
import { QuestionPaper } from '../service/question-paper';

@Component({
  selector: 'app-dash-board',
  standalone: false,
  templateUrl: './dash-board.html',
  styleUrls: ['./dash-board.css'],
})
export class DashBoard {
  questionStatus = false;

  questions:any = {}; 

  constructor(private questionPaperServie : QuestionPaper , private cd : ChangeDetectorRef) {}

  // ngOnInit() {
  //  this.questionPaperServie.getAllQuestion().subscribe({
  //     next : (data) => {
  //       this.questions = data;
  //       this.questionStatus = true;
  //       console.log("This is the fetched Quesitons =",this.questions);
  //     },
  //     error : (error) => {
  //       this.questionStatus = true;
  //       console.log("Something Went Wrong",error);
  //     }
  //   })
  // }
  
  getQuestion() {
    this.questionPaperServie.getAllQuestion().subscribe({
      next : (data) => {
        this.questions = data;
        this.questionStatus = true;
        console.log("This is the fetched Quesitons =",this.questions);
        this.cd.detectChanges();
      },
      error : (error) => {
        this.questionStatus = true;
        console.log("Something Went Wrong",error);
      }
    });
  }


  setAnswer(e : any) {
    this.questionPaperServie.setAnswer(e).subscribe(()=> {this.getQuestion()});
  }

  sumitAnswer() {
    this.questionPaperServie.checkAnswer().subscribe(()=> {this.getQuestion()});
  }

} 
