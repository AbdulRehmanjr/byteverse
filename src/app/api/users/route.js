import { NextResponse } from "next/server";

export function GET(request){
 const users =[{
     name: "Malaika",
     phone:"4567",
     fav_course: "App Development",
     language:"Python",
     Roll_no: '22014198-063'
 },
 {
    name:"Rooms Maryam",
    phone:"19083",
    fav_course:"Artifical Intelligence,Data Science",
    lnguage:"Python",
    Roll_no:'21051519-008',
 },
 {
    name:"Mirha  Fatima",
    phone:"21092",
    language:"Java",
    couse:"Compiler construction",
    Roll_no:'211014198-064',
 },
 {
    name:"Alice",
    phone :"567392",
    language:"Typescript",
    fav_course:"Assembly language",
    Roll_no:'2105159-001'
 },
 ];
 return  NextResponse.json(users)
}
export function POST(){

}
export function DELETE(request){
    console.log("delete api called");
    return 
}
export function PUT(){

}