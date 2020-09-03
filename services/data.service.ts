import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { friend } from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private allPosts: Observable<Post[]>;
  private allFriends: Observable<friend[]>;
  
  postCollection:AngularFirestoreCollection<Post>;
  friendCollection:AngularFirestoreCollection<friend>;
  constructor(private fst:AngularFirestore) {
    this.postCollection = fst.collection<Post>('posts');
    this.friendCollection= fst.collection<friend>('friends');

  }

  private retrievePosts() {
    this.allPosts = this.postCollection.valueChanges();
    
  }
  private retrieveFriends(){
    this.allFriends = this.friendCollection.valueChanges();
  }
  

   public savePost(post){
    let item = Object.assign({},post);
  
    this.postCollection.add(item);
  }
  public getAllPosts() {
    this.retrievePosts();
    return this.allPosts;
  
  }
  public saveFriend(friend){
    let item = Object.assign({},friend);
    this.friendCollection
    .add(item)
    .then(()=> console.log("saved correctly!"))
    .catch((error)=>console.log("Error saving!",error));
  }
  public getAllFriends(){
    this.retrieveFriends();
    return this.allFriends;
  }

}
