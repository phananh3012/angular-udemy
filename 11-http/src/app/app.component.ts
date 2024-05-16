import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching= false
  error = null
  private errorSub: Subscription

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe( errorMessage => {
      this.isFetching = false
      this.error = errorMessage
    })
    this.fetchPosts()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createPost(postData.title,postData.content)
  }

  onFetchPosts() {
    this.fetchPosts()
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  private fetchPosts(){
    this.isFetching = true
    this.postService.fetchPost().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false
      this.error = error.message
      console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }

  onHandleError() {
    this.error = null
  }
}
