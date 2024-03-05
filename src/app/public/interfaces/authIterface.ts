export interface User {
    token: string;
    username: string;
    roles?: any;
}
export interface RegisterUser{
    username:string,
    password:string,
    rePassword:string,
    email:string,
    seller_id:number
}
