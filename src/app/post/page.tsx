
import { db } from "~/server/db";

export default async function PostPages() {
    await db.post.create({
        data:{
            title:"My first  project",
            content: "My first project",
            published: true,



        }
    })

    // await db.post.createMany({
    //     data: [
    //         {
    //             title: "My second post",
    //             content: "This is my second post",
    //             published: true,
    //         },
    //         {
    //             title: "My third post",
    //             content: "This is my third post",
    //             published: true,
    //         },
    //         {
    //             title:"My Fourth Project",
    //             content:"This is my Fourth post",
    //             published: false,
    //         }
    //     ] 
    // })


// await db.post.updateMany({
//     where: {
//         id: "cm7fre0r80002vz0cibxls2bq",
//         title:'My first post'
//     },
//     data: {
//         published: true,
//         title:'ByteVerse'
//     }
// })

const posts = await db.post.findMany()

console.log(posts)
    return(
        <main className="flex flex-col items-center justify-center gyap-y-5 pt-24 text-center h-screen">
            <h1 className="text-3xl font-semibold">All posts(0)</h1>
            <ul className="border-t border-b border-black/10 py-5 leading-8"></ul>
        </main>
    );
    
}