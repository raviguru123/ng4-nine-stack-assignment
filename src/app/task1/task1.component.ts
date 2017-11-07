import { Component, OnInit } from '@angular/core';
import {Tweet} from '../tweet';
import {TweetService} from '../tweet.service';
import {SearchPipe} from './search.pipe';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task1',
  templateUrl: './task1.component.html',
  styleUrls: ['./task1.component.css'],
  providers:[SearchPipe]
})
export class Task1Component implements OnInit {
  tweets:Tweet[];
  searchtweets:Tweet[];
  tweettxt:string;
  searchtweettxt:string;

  constructor(private tweetservice:TweetService,private searchpipe:SearchPipe,private route:ActivatedRoute) { }
  ngOnInit() {
    this.getTweet();
  }

  getTweet() {
    this.tweetservice.getTweets().then(tweets=> {
        this.tweets=tweets;
        this.searchtweets=tweets;
      });
}

puttweet(tweet:Tweet) {
  this.tweetservice.puttweet(tweet);
}

  submittweet(tweettxt:any) {
    const tweetobj = {} as Tweet;
    tweetobj.id=new Date().getTime();
    tweetobj.text=tweettxt;
    this.puttweet(tweetobj);
    this.tweettxt="";
  }

 
  searchtweetsubmit(text:any) {
    this.searchtweets=this.tweets;
    this.searchtweets=this.searchpipe.transform(this.tweets,text);
  }

}
