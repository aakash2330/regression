"use client"

import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [headers, setHeaders] = useState(["hello", "world"]);
  const [selectedDependedVariable, setSelectedDependentVariable] = useState("");
  const [selectedInDependedVariable, setSelectedInDependedVariable] = useState("");

  return (

    <div className='h-screen flex justify-center items-center'>

      <Card className='flex flex-col justify-center items-center gap-10'>
        <CardHeader>
          <CardTitle>Regression</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file"
              onChange={async (e) =>

              //upload file
              {
                console.log(e.target.files ? e.target.files[0] : "no file found");
                const formData = new FormData();
                formData.append('file', e.target.files ? e.target.files[0] : "no file found");
                const { data } = await axios.post("http://localhost:3000/api/file", formData);
                console.log(data);
                setHeaders(data.headers)
              }}


            />
          </div>
        </CardContent>

        <div className='flex justify-center items-center gap-[15rem]'>
          <Select onValueChange={(e) => { setSelectedDependentVariable(e) }}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select dependent variable" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {headers.map((header, index) => { return <SelectItem key={index + "depenent"} value={header}>{header}</SelectItem> })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(e) => { setSelectedInDependedVariable(e) }}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select independent variable" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {headers.map((header, index) => { return <SelectItem key={index + "independednt"} value={header}>{header}</SelectItem> })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <br></br>
        <Button onClick={() => {
          console.log({ selectedDependedVariable, selectedInDependedVariable })
        }}>Button</Button>
      </Card>
    </div>

  )
}
