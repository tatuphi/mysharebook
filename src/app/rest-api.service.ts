import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { } from 'rxjs/operators';
import { Book, ShareBook, Review, UserInfo } from './models/book';
// import { relative } from 'path';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json', 
    'Access-Control-Allow-Origin':'*'
  })
 
};

// const baseUrl="http://localhost:3333/`api`/"
// const baseUrl="http://192.168.136.177:3333/api/"
const baseUrl="http://192.168.1.4:3333/api/"

const apiUrl = baseUrl + "book";
const apiUserUrl= baseUrl + "user";
const apiShareUrl= baseUrl + "sharebook";
const apiRequestUrl= baseUrl + "borrowbook";
const apiReviewUrl= baseUrl + "review";
const apiCategoryUrl= baseUrl + "category";


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  change_count:number;
  create_datetime: string;
  create_emp_id: string;
  data_flag: string;
  change_datetime: string;
  change_emp_id: string;
  route: any;
  constructor(private http: HttpClient) { 
    this.create_datetime = new Date().toISOString();
    this.change_datetime = new Date().toISOString();
    this.change_count= 1;
    this.create_emp_id='1';
    this.change_emp_id='1';
    this.data_flag='1';
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  //////////////// BOOK/////////////////

  //get all books
  getBook(): Observable<any> {
    const url = `${apiUrl}/get`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // get books by owner
  getBookByOwner(OwnerID): Observable<any> {
    const url = `${apiUrl}/get/Owner/${OwnerID}`;//change id depend on login user, just ex id=2
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  // get book info by id
  getBookById(id: string): Observable<any> {
    const url = `${apiUrl}/get/${id}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // get books by category
  getBookByCategory(Category):Observable<any>
  {
    const url= `${apiUrl}/get/Category/${Category}`;
    return this.http.post(url,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  // postBook(data): Observable<any> {
  //   const url = `${apiUrl}/add_with_students`;
  //   return this.http.post(url, data, httpOptions)
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }
  postBook(image, num,bookname,author,category,description, ownner): Promise<any>
  {
    console.log("");
    let param={
      image: image,
      name:bookname,
      isbn: num,
      author: author,
      description: description,
      category_id: '1',
      owner_id: ownner,//not yet have login func, so cant get owner, just get owner ex=2
      change_count:this.change_count,
      create_datetime: this.create_datetime,
      create_emp_id: this.create_emp_id,
      data_flag: this.data_flag,
      change_datetime: this.change_datetime,
      change_emp_id: this.change_emp_id,
    }
    const url = `${apiUrl}/save`;
    let request= this.http.post(url,param);
    return request.toPromise();
  }
  
  updateBook(data): Promise<any> {
    const url = `${apiUrl}/save`;
    let param={
      id: data.id,
      image: data.image,
      name:data.name,
      isbn: data.isbn,
      author: data.author,
      description: data.description,
      category_id: '1',
    }
    let request= this.http.post(url,param);
    return request.toPromise();
  }
 
  deleteBook(id): Observable<{}> {
    const url = `${apiUrl}/delete/${id}`;
    return this.http.post(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // get books by isbn
  getBookByisbn(isbn):Observable<any>
  {
    const url=`${apiUrl}/get/isbn/${isbn}`;
    return this.http.post(url,httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  ///////////////// SHARE BOOK///////////////////

  // share book
  shareBook(bookid,startdate,enddate): Promise<any>
  {
    console.log();
    let param={
      book_id:bookid,
      startdate: startdate,
      enddate: enddate,
      // isshared: false,
      change_count:this.change_count,
      create_datetime: this.create_datetime,
      create_emp_id: this.create_emp_id,
      data_flag: this.data_flag,
      change_datetime: this.change_datetime,
      change_emp_id: this.change_emp_id,
    }
    const url=`${apiShareUrl}/save`;
    let request= this.http.post(url,param);
    return request.toPromise();
  }

  // get books shared 
  getBookShared(): Observable<any> {
    const url = `${apiShareUrl}/get`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  // get share info by bookid
  getBookSharedByBookID(BookID):Observable<any>{
    const url=`${apiShareUrl}/get/BookID/${BookID}`;
    return this.http.post(url,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
    }

  // get sharebook info without request
  getBookSharedWithoutRequest(): Observable<any> {
    const url = `${apiShareUrl}/get/notrequest`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /////////////////// REQUEST BOOK////////////////////

  // request to borrow book
  getRequests(): Observable<any> {
    const url = `${apiRequestUrl}/get`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  
  requestBook(bookid,userid,startdate,enddate): Promise<any>
  {
    console.log();
    const url = `${apiRequestUrl}/save`;
    let param={
      book_id:bookid,
      borrower_id: userid,
      startdate: startdate,
      enddate: enddate,
      // insert base info
      change_count:this.change_count,
      create_datetime: this.create_datetime,
      create_emp_id: this.create_emp_id,
      data_flag: this.data_flag,
      change_datetime: this.change_datetime,
      change_emp_id: this.change_emp_id,
    }
    
    let request= this.http.post(url,param);
    return request.toPromise();
  }


  // update request with isaccepnted= true or false;
  updateRequest(id,isaccepted): Promise<any>
  {
    console.log();
    const url = `${apiRequestUrl}/save`;
    let param={
      id: id,
      isaccepted:isaccepted
    }
    let request= this.http.post(url,param);
    return request.toPromise();
  }
  // get request by userid
  getRequestByUserID(UserID): Observable<any> {
    const url = `${apiRequestUrl}/get/UserID/${UserID}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // get Request book info by borrower_id and book_id
  getRequestByBookBorrower(BookID, BorrowerID): Observable<any>{
    const url = `${apiRequestUrl}/get/Book/${BookID}/Borrower/${BorrowerID}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  ////////////////COMMENT BOOK//////////////////////

  //get review by book id
  getReviewByBookID(BookID): Observable<any>{
    const url = `${apiReviewUrl}/get/BookID/${BookID}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  // post comment 
  postComment(bookid,userid,content): Promise<any>
  {
    console.log();
    const url = `${apiReviewUrl}/save`;
    let param={
      book_id:bookid,
      reviewer_id: userid,
      content: content,
      //createat: createAt,
      // insert base info
      change_count:this.change_count,
      create_datetime: this.create_datetime,
      create_emp_id: this.create_emp_id,
      data_flag: this.data_flag,
      change_datetime: this.change_datetime,
      change_emp_id: this.change_emp_id,
    }
    
    let request= this.http.post(url,param);
    return request.toPromise();
  }

  //edit comment
  updateComment1(id, data: string): Observable<any> {
    const url = `${apiReviewUrl}/${id}`;
    return this.http.patch(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      
  }
  
  updateComment(id,content): Promise<any>
  {
    console.log();
    const url = `${apiReviewUrl}/save`;
    let param={
      id: id,
      content:content
      // createat: createAt
    }
    let request= this.http.post(url,param);
    return request.toPromise();
  }
  //delete comment
  deleteComment(id): Observable<{}> {
    const url = `${apiReviewUrl}/delete/${id}`;
    return this.http.post(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  // get Comment by Id
  getCommentById(id): Observable<any> {
    const url = `${apiReviewUrl}/get/${id}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }  

  ///////////////// USER////////////////////

  // get users
  getUser(): Observable<any> {
    const url = `${apiUserUrl}/get`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  // get user by id
  getUserById(id):Observable<any>{
    const url=`${apiUserUrl}/get/${id}`;
    return this.http.post(url,httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  //edit user
  updateUser(data: UserInfo): Promise<any> {
    // console.log();
    const url = `${apiUserUrl}/save`;
    let param={
      id: data.id,
      password: data.password,
      gender: data.gender,
      firstname: data.firstname,
      lastname: data.lastname,
      birthday: data.birthday,
      avatar: data.avatar
    }
    let request= this.http.post(url,param);
    return request.toPromise();
  }

  // create user
  postUser(data): Promise<any>
  {
    console.log();
    const url = `${baseUrl}auth/register`;
    let param={
      email: data.email,
      lastname:data.lastname,
      firstname: data.firstname,
      birthday: data.birthday,
      gender: data.gender,
      avatar: data.avatar,
      password:data.password,
      change_count:this.change_count,
      create_datetime: this.create_datetime,
      create_emp_id: this.create_emp_id,
      data_flag: this.data_flag,
      change_datetime: this.change_datetime,
      change_emp_id: this.change_emp_id,
    }
    let request= this.http.post(url,param);
    return request.toPromise();
    }

  ///////////////// CATEGORY ///////////////

  // get categories
  getCategories(): Observable<any> {
    const url = `${apiCategoryUrl}/get`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // get category info by id
  getCategoryById(id): Observable<any> {
    const url = `${apiCategoryUrl}/get/${id}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  // get cate info by name
  getCategoryByName(name: string): Observable<any> {
    const url = `${apiCategoryUrl}/get/CategoryName/${name}`;
    return this.http.post(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
// get book api by isbn
  getBookByIsbnJson(isbn): Observable<any> {
    
    const bookApiUrl='http://localhost:3000/books';
    const url = `${bookApiUrl}?isbn=${isbn}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
