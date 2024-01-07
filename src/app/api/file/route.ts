import * as fs from 'fs';
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server';
const readline = require('readline');

export async function POST(req:NextRequest) {

  let resultArr:any = [];
  const readData = new Promise(async(resolve,reject)=>{

  const data = await  req.formData();
  const file: File | null = data.get('file') as unknown as File

if(file){
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const path = `${__dirname}/${file.name}`
  await writeFile(path, buffer)
  console.log(`file uploaded at ${path} `)
  console.log()

const readInterface = await readline.createInterface({
  input: fs.createReadStream(path),
  output: process.stdout,
  console: false
});

// Read the first line (header)
await readInterface.on('line', (line:any) => {
  const headers = line.split(','); // Split the line by commas
  resultArr = headers;
  resolve(resultArr);
  readInterface.close(); // Close the stream after reading the first line
});
}

  }) 

  await readData;
    return Response.json({ headers:resultArr})
  }