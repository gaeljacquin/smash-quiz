// import { client } from "@/utils/db";
// import { redirect } from 'next/navigation';

// export default async function logGame(
//   clipId: number,
//   toggledCharactersLength: number,
//   clipFightersLength: number,
//   toggledCharacters: string[],
// ) {
//   const id = Math.floor(Math.random() * 100000);

//   await client.hSet(`books:${id}`, {
//     title,
//     rating,
//     author,
//     blurb
//   })

//   return;
// }
// 'use server'



// export async function createBook(formData) {
//   const {title, rating, author, blurb} = Object.fromEntries(formData);

//   const id = Math.floor(Math.random() * 100000);

//   await client.hSet(`books:${id}`, {
//     title,
//     rating,
//     author,
//     blurb
//   })

//   redirect('/')
// }
