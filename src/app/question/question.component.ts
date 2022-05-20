import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public questionList : any = [];
  public currentQuestion : number = 0;
  public points : number =0;
  counter=60;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  interval$:any;
  progress:string="0";
  isQuizCompleted : boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions()
  {
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList=res.questions;
    })
  }

  answer(currentQuestion:number, option:any)
  {
    if(currentQuestion=== this.questionList.length)
    {
      this.isQuizCompleted=true;
    }
    if(option.correct)
    {
      
      this.points+=2;
      this.correctAnswer++;

      setTimeout(()=>
      {
      this.currentQuestion++;
      this.getProgressPercent();
      },1000);
    }
    else
    {
      setTimeout(()=>
      {this.currentQuestion++;
        this.points-=2;
        this.incorrectAnswer++;
        this.getProgressPercent();
      },1000);
    }
  }
  resetQuiz()
  {
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgressPercent()
  {
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
