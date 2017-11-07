import { Component, OnInit } from '@angular/core';
import {Tweet} from '../tweet';
import {TweetService} from '../tweet.service';
import {SearchPipe} from './search.pipe';
import {Location} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';

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
  page:string;
  searchtweettxt:any;
  constructor(private router: Router,private location: Location,private tweetservice:TweetService,private searchpipe:SearchPipe) { }
 
  ngOnInit() {
    this.getTweet();
    const parsedUrl:any = this.router.parseUrl(this.router.url);
    this.page=parsedUrl.queryParams.page;
    this.searchtweettxt=parsedUrl.queryParams.hashtag;
    
  }

  getTweet() {
    this.tweetservice.getTweets().then(tweets=> {
        this.tweets=tweets;
        this.searchtweets=this.searchpipe.transform(tweets,this.searchtweettxt);
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
    this.location.go( '/task1?page=search&hashtag='+text);
    this.searchtweets=this.tweets;
    this.searchtweets=this.searchpipe.transform(this.tweets,text);
  }

}
