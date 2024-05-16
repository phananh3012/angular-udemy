import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>()
  constructor(private http: HttpClient) { }

  createPost(title: string, content: string){
    const postData = {title: title, content: content}
    this.http.post<{ name: string }>(
      'https://ng-complete-guide-5284e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      postData, {
        observe: 'response'
      }).subscribe(
      responseData => {
        console.log(responseData)
      }, error => {
        this.error.next(error.message)
      }
    )
  }

  fetchPost(){
    let searchParam = new HttpParams()
    searchParam = searchParam.append('print', 'pretty')
    searchParam = searchParam.append('custom', 'key')
    return this.http
      .get<{[key: string]: Post }>('https://ng-complete-guide-5284e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: searchParam,
          responseType: 'json'
        })
      .pipe(
        map(responseData => {
            const postsArray: Post[] = []
            for(const key in responseData) {
              if(responseData.hasOwnProperty(key)){
                postsArray.push({...responseData[key], id: key})
              }
            }
            return postsArray
          }
        ), catchError( errorRes => {
          return throwError(errorRes)
        }))
  }

  deletePosts(){
    return this.http.delete('https://ng-complete-guide-5284e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',{
      observe: 'events'
    }).pipe(
      tap(event => {
        console.log(event)
        if(event.type === HttpEventType.Sent){
        }
        if(event.type === HttpEventType.Response){
          console.log(event.body)
        }
      })
    )
  }
}


