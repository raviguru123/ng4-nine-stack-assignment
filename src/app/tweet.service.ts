import {Injectable} from '@angular/core';
import {Tweet} from './tweet';

const tweets:Tweet[]=[
{id:1,text:'Hello this is my first tweet'},
{id:2,text:'Hello this is my second tweet'},
{id:3,text:'Hello this is my third tweet'},
{id:4,text:'Hello this is my fourth tweet'},
{id:5,text:'Hello this is my five tweet'},
{id:6,text:'Hello this is my six tweet'},
{id:7,text:'Hello this is my seven tweet'},
];

@Injectable()

export class TweetService {
    getTweets():Promise<Tweet[]> {
        return Promise.resolve(tweets);
    }
    
    puttweet(tweet:Tweet):void {
        tweets.unshift(tweet);
    }
}