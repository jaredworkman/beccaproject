import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})

export class DirectoryComponent implements OnInit {

  stringList = [];
  loadedQuestions: Array<any>;
  QuestionsAndAnswers = new Map();
  answers: any;
  question: string;
  keywordQuestions = [];
    
  constructor(public firebaseService: FirebaseService) {

  }

  getAnswersKeyword(event:any){
    this.question = event.target.value;
    this.keywordQuestions = [];
    this.answers = this.QuestionsAndAnswers.get(this.question);
    if(this.question != ''){
      this.stringList.forEach(key => {
        if(key === this.question || key.search(this.question) != -1){
          this.keywordQuestions.push(key);
        }
      })
    }
  }
  
  getAnswers(event: any){
    this.question = event.target.value;
    this.firebaseService.getAnswers(this.question).subscribe(
      data => {
        this.answers = data.payload.data();
      });;
    
  }
  getQuestions(){
    this.firebaseService.getQuestions().subscribe(result => {
      this.loadedQuestions = result;
      this.loadedQuestions.forEach(question => {
        this.stringList.push(question.payload.doc.data().question);
        this.QuestionsAndAnswers.set(question.payload.doc.data().question, question.payload.doc.data().answer);
      });
    });;
  }

  ngOnInit() {
    this.getQuestions();
   }

}
