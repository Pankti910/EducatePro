export interface Classes{
    _id:string,
    classname:string,
    creatorOfclass: {
        _id:string,
        fname: string,
        lname: string,
        email: string
    },
    status:string
}