import { ChangeDetectorRef, Component } from '@angular/core';
import { QuestionPaper } from '../../service/question-paper';

@Component({
  selector: 'app-question-wrapper',
  standalone: false,
  templateUrl: './question-wrapper.html',
  styleUrl: './question-wrapper.css',
})
export class QuestionWrapper {
   questionStatus = false;

  questions:any = {}; 

  constructor(private questionPaperServie : QuestionPaper , private cd : ChangeDetectorRef) {}

  ngOnInit() {
   this.getQuestion();
  }
  
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
