
async function takeTime(){
 await new Promise((resolve)=>
        setTimeout(resolve,3000))
}
export default async function Profile(){
   await  takeTime();
   throw new Error("This is new error");
    return(
        <>
        <h1>This is the Profile Page</h1>
        </>
    )
}