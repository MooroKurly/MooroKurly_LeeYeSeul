export interface IUser{
    id:string;
    password:string;
    name:string;
    phone:string;
    address:string;
    birthday:Date;
    gender:String;
    date:Date;
}

export interface IUserInputDTO{
    id:string;
    password:string;
    name:string;
    phone:string;
    address:string;
    birthday:Date;
    gender:String;
}