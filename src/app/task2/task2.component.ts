import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import {Ball} from './ball';
@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit,AfterViewInit {
 
  c;
  canvas;
  radius = 25;
  s = 100;
  container = { x: 0, y: 0, width: 900, height: 700 };
  Number_of_ball;
  circles:Ball[];
  count:number;
  @ViewChild("myCanvas") myCanvas;

  ngAfterViewInit() {
    this.canvas = this.myCanvas.nativeElement;
    this.c =this.canvas.getContext('2d');
    this.Number_of_ball=this.getRandomInt(1,10);
    this.circles=this.produce_number_of_balls(this.Number_of_ball);
    this.count =this.circles.length;
    requestAnimationFrame(()=> {
      this.draw();
    });

    
  }

  constructor() { 
  
  }

   getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
  }

   getRandVel () {
     const min = 5;
    const max = 10;
    let vel = this.getRandomInt(min, max);
    vel = Math.random() <0.5 ? -vel : vel;

    return vel;
  }

   getRandX () {
    let RandX = this.getRandomInt(this.radius+5, this.container.width - this.radius - 5);
    if(RandX + this.radius >= this.canvas.width /2 - this.s/2  &&  RandX - this.radius <= this.canvas.width /2 + this.s/2) {
      RandX += 100;
    } 
    return RandX;
  }
   getRandY () {
    return this.getRandomInt(this.radius+5, this.container.height - this.radius - 5);
  }

   check_balls_collision(balls,ball) {
    for(let i=0;i<balls.length;i++) {
      const dx:number = balls[i].x - ball.x;	
      const dy:number = balls[i].y - ball.y;
      const distance:number = Math.sqrt(dx * dx + dy * dy);
      if (distance< balls[i].r + ball.r) {
        return true;
      }
 }
    return false;
  }



  produce_number_of_balls(ball_count) {
  const balls: Ball[]=new Array();
  while(balls.length<ball_count) {
      const ball=new Ball();
      ball.x=this.getRandX();
      ball.y=this.getRandX();
      ball.r=this.radius;
      ball.color=this.getRandomInt(30,330);
      ball.vx=this.getRandVel();
      ball.vy=this.getRandVel();
      if(!this.check_balls_collision(balls,ball)) {
        balls.push(ball);
      }
    }
    return balls;
  }
  score() {
    const scoreText =this.count.toString();
    this.c.beginPath();
    this.c.rect(this.canvas.width / 2 -this.s/2, this.canvas.height / 2 -this.s/2, this.s, this.s);
    this.c.strokeStyle = '#3c3c3c';
    this.c.stroke();
    this.c.font = 'bold 20pt Open Sans';
    this.c.fillStyle = '#FF4E50';
    this.c.fillText(scoreText, (this.canvas.width - scoreText.length * 15) / 2, (this.canvas.height + 9) / 2);
}

   draw() {
   // console.log("this.c",this);
    this.c.fillStyle = 'black';
    this.c.strokeStyle = 'black';
    this.c.fillRect(this.container.x, this.container.y, this.container.width, this.container.height);
    this.score();

    for (let i = 0; i < this.circles.length; i++) {
      this.c.fillStyle = 'hsl(' + this.circles[i].color + ',100%,50%)';
      this.c.beginPath();
      this.c.arc(this.circles[i].x, this.circles[i].y, this.circles[i].r, 0, 2 * Math.PI, false);
      this.c.fill();

          // check if the ball has hit any of the this.container's walls
          if ((this.circles[i].x + this.circles[i].vx + this.circles[i].r > this.container.x + this.container.width)
           || (this.circles[i].x - this.circles[i].r + this.circles[i].vx < this.container.x)) {
            this.circles[i].vx = - this.circles[i].vx;
          }
          if ((this.circles[i].y + this.circles[i].vy + this.circles[i].r > this.container.y + this.container.height) 
          || (this.circles[i].y - this.circles[i].r + this.circles[i].vy < this.container.y)) {
            this.circles[i].vy = - this.circles[i].vy;
          }

          // check if the ball has hit the square

          

          if (this.circles[i].x + this.circles[i].r >= 
            this.canvas.width / 2 - this.s / 2 && this.circles[i].x - this.circles[i].r 
            <= this.canvas.width / 2 + this.s / 2
            && 
            this.circles[i].y + this.circles[i].r >=
            this.canvas.height / 2 - this.s / 2 && this.circles[i].y - this.circles[i].r
             <= this.canvas.height / 2 + this.s / 2) {
                  // delete this.circles[i];
              this.circles[i].r = 0;
              this.circles[i].x = -100;
              this.circles[i].y = -100;
              this.circles[i].vx = 0;
              this.circles[i].vy = 0;
              this.count -= 1;
              this.score();

          }

          for (let j = 0; j < this.circles.length; j++) {
            if (j !== i) {
              if (this.check_balls_collision([this.circles[i]],this.circles[j])) {
                const vel_x1 = this.circles[i].vx;
                const vel_y1 = this.circles[i].vy;
                this.circles[i].vx = this.circles[j].vx;
                this.circles[i].vy = this.circles[j].vy;
                this.circles[j].vx = vel_x1;
                this.circles[j].vy = vel_y1;
                // after balls collision,check if the ball has hit any of the this.container's walls
                if ((this.circles[i].x + this.circles[i].vx + this.circles[i].r >
                   this.container.x + this.container.width) ||
                    (this.circles[i].x - this.circles[i].r + this.circles[i].vx < this.container.x)) {
                  this.circles[i].vx = - this.circles[i].vx;
                }
                if ((this.circles[i].y + this.circles[i].vy + this.circles[i].r >
                   this.container.y + this.container.height) ||
                    (this.circles[i].y - this.circles[i].r + this.circles[i].vy < this.container.y)) {
                  this.circles[i].vy = - this.circles[i].vy;
                }

                // after balls collision,check if the ball has hit any of the this.container's walls
                if ((this.circles[j].x + this.circles[j].vx + this.circles[j].r > 
                  this.container.x + this.container.width) ||
                   (this.circles[j].x - this.circles[j].r + this.circles[j].vx < this.container.x)) {
                  this.circles[j].vx = - this.circles[j].vx;
                }

                if ((this.circles[j].y + this.circles[j].vy + this.circles[j].r >
                   this.container.y + this.container.height) || 
                   (this.circles[j].y - this.circles[j].r + this.circles[j].vy < this.container.y)) {
                  this.circles[j].vy = - this.circles[j].vy;
                }
              }
            }
          }

          this.circles[i].x += this.circles[i].vx;
          this.circles[i].y += this.circles[i].vy;
      }
 requestAnimationFrame(()=> {
      this.draw();
    });

  }
  
ngOnInit() {
  }

}
