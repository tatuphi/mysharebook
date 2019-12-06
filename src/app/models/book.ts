export class Book
{
    // id: string;
    // ISBN: string;
    // BooKName: string;
    // CategoryName: string;
    // Description:string;
    // Author: string;
    // Owner: string;
    // Image: string;
    // StartShare: string;
    // EndShare: string;
    id: string;
    isbn: string;
    name: string;
    category_id: string;
    description:string;
    author: string;
    owner_id: string;
    image: string;
}

export class ShareBook
{
    // id: string;
    // BookID: string;
    // OwnerID: string;
    // StartDate: Date;
    // EndDate: Date;
    // StatusShare: Int16Array;
    id: string;
    book_id: string;
    // OwnerID: string;
    startdate: Date;
    enddate: Date;
    StatusShare: Int16Array;
}

// activity (borrow & share) & list request
// act share save borrower 
export class BorrowBook 
{
    // id: string;
    // BookID: string;
    // UserID: string;
    // // userid is borrower
    // StartDate: Date;
    // EndDate: Date;
    // // IsAccepted==true, show a new item on sharer's  activity list
    // // at that time, disappear on home list
    // // just appear as borrower return book 
    // IsAccepted: boolean;
    // IsReturned: boolean;
    // IsViewed: boolean;
    id: string;
    book_id: string;
    borrower_id: string;
    // userid is borrower
    startdate: Date;
    enddate: Date;
    // IsAccepted==true, show a new item on sharer's  activity list
    // at that time, disappear on home list
    // just appear as borrower return book 
    isaccepted: boolean;
    isreturned: boolean;
    isviewed: boolean;
}
export class UserInfo
{
    // id: string;
    // Email: string;
    // Password: string;
    // Firstname: string;
    // Lastname: string;
    // Gender: string;
    // Avatar: string;
    // Birthday: string;
    id: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    gender: boolean;
    avatar: string;
    birthday: Date;
}
export class Review
{
    // id: string;
    // BookID: string;
    // UserID: string;
    // Content: string;
    // CreateAt: Date;
    id: string;
    book_id: string;
    reviewer_id: string;
    content: string;
    // createat: Date;
}
export class Category
{
    // id:string;
    // CategoryName: string;
    id:string;
    name: string;
}