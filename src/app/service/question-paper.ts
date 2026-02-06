import { Injectable } from '@angular/core';
import { from, Observable  , of} from 'rxjs';

// type 1 = one line 
// type 2 = paragraph 
// type 3 = multi choice 
// type 4 = check box

const Questions = {
  "questions" : [
    {
      "id" : 1,
      "type" : 1,
      "question" : "What does HTML stand for?"
    },
    {
      "id" : 2,
      "type" : 3,
      "question" : "Which of the following is a JavaScript framework?",
      "choice" : ["Laravel","Django","Angular","Flask"]
    },
    {
      "id" : 3,
      "type" : 2,
      "question" : "Explain the difference between frontend and backend development."
    },
    {
      "id" : 4,
      "type" : 4,
      "question" : "Select JavaScript libraries/frameworks.",
      "choice" : ["React","Angular","Laravel","Vue"]
    },
    {
      "id" : 5,
      "type" : 1,
      "question" : "What does SQL stand for?"
    },
    {
      "id" : 6,
      "type" : 3,
      "question" : "Which of the following is a JavaScript framework?",
      "choice" : ["Java","C","Python","JavaScript"]
    },
    {
      "id" : 7,
      "type" : 4,
      "question" : "Select operating systems.",
      "choice" : ["Windows","Linux","SQL","macOS"]
    },
    {
      "id" : 8,
      "type" : 2,
      "question" : "Explain the role of CSS in web development."
    },
    {
      "id" : 9,
      "type" : 3,
      "question" : "Which data structure uses FIFO?",
      "choice" : ["Stack","Queue","Tree","Graph"]
    },
    {
      "id" : 10,
      "type" : 4,
      "question" : "Select backend languages.",
      "choice" : ["Node.js","Python","PHP","CSS"]
    }
  ]
}

@Injectable({
  providedIn: 'root',
})
export class QuestionPaper {

  getAllQuestion():Observable<any> {
    return from(Questions.questions);
  }
}