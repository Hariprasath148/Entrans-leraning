import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable  , of, Subject} from 'rxjs';
import { Question } from '../question/question';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class QuestionPaper {
  private baseUrl = "http://localhost:5058/";
  constructor(private http:HttpClient) {}

  // type 1 = one line 
  // type 2 = paragraph 
  // type 3 = multi choice 
  // type 4 = check box


  private Questions = {
    "questions" : [
      {
        "id" : 1,
        "type" : 1,
        "question" : "What does HTML stand for?",
        "required" : true,
        "isAttended" : false,
        "answer" : "",
      },
      {
        "id" : 2,
        "type" : 3,
        "question" : "Which of the following is a JavaScript framework?",
        "choice" : ["Laravel","Django","Angular","Flask"],
        "required" : true,
        "isAttended" : false,
        "answer" : [],
      },
      {
        "id" : 3,
        "type" : 2,
        "question" : "Explain the difference between frontend and backend development.",
        "required" : true,
        "isAttended" : false,
        "answer" : "",
      },
      {
        "id" : 4,
        "type" : 4,
        "question" : "Select JavaScript libraries/frameworks.",
        "choice" : ["React","Angular","Laravel","Vue"],
        "required" : true,
        "isAttended" : false,
        "answer" : [],
      },
      {
        "id" : 5,
        "type" : 1,
        "question" : "What does SQL stand for?",
        "required" : true,
        "isAttended" : false,
        "answer" : "",
      },
      {
        "id" : 6,
        "type" : 3,
        "question" : "Which of the following is a JavaScript framework?",
        "choice" : ["Java","C","Python","JavaScript"],
        "required" : true,
        "isAttended" : false,
        "answer" : [],
      },
      {
        "id" : 7,
        "type" : 4,
        "question" : "Select operating systems.",
        "choice" : ["Windows","Linux","SQL","macOS"],
        "required" : true,
        "isAttended" : false,
        "answer" : [],
      },
      {
        "id" : 8,
        "type" : 2,
        "question" : "Explain the role of CSS in web development.",
        "required" : true,
        "isAttended" : false,
        "answer" : "",
      },
      {
        "id" : 9,
        "type" : 3,
        "question" : "Which data structure uses FIFO?",
        "choice" : ["Stack","Queue","Tree","Graph"],
        "required" : true,
        "isAttended" : false,
        "answer" : [],
      },
      {
        "id" : 10,
        "type" : 4,
        "question" : "Select backend languages.",
        "choice" : ["Node.js","Python","PHP","CSS"],
        "required" : true,
        "isAttended" : false,
        "answer" : [],
      }
    ],
    submitted : false
  }

  getAllQuestion():Observable<any> {
    return this.http.get<any>(`${this.baseUrl}questionPaper/getAllQuestions`);
  }   

  setAnswer(answer:any):Observable<any> {
    console.log(answer);
    return this.http.post<any>(`${this.baseUrl}questionPaper/editQuestion`,answer);
  }
  
  checkAnswer():Observable<any>  {
    return this.http.post<any>(`${this.baseUrl}questionPaper/submitQuestions`,null);
  }
}