import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
    name:'search'
})


export class SearchPipe implements PipeTransform {
    public transform(tweets,term) {
        console.log("filter call");
            return tweets.filter(function(obj){
                if(!term) {
                    return true;
                }
                if(obj.text.toLowerCase().indexOf(term.toLowerCase())>=0) {
                    return true;
                }
            });
          }
}