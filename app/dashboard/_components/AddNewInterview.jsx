'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/AIModel';
import { Loader } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
  

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDescription, setJobDescription] = useState();
    const [jobExp, setJobExp] = useState();
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const user = useUser();

    const onSubmit = async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log(jobDescription, jobPosition, jobExp)

        const inputPrompt = "Job position:"+jobPosition+",Job description:"+jobDescription+", Years of experience:"+jobExp+". Depends on job position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions along with Answers in JSON format, Give us question and answer field on JSON without new line characters"

        try{
          const result = await chatSession.sendMessage(inputPrompt);
          const json = (result.response.text()).replace('```json', '').replace('```','')
          console.log(JSON.parse(json));
          setJsonResponse(json);

          if(json){
            const  response = await db.insert(MockInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResp:json,
              jobPosition:jobPosition,
              jobDesc:jobDescription,
              jobExperince:jobExp,
              createdBy:user?.user?.primaryEmailAddress?.emailAddress,
              createdAt:moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview?.mockId});
          }
          else{
            console.log("ERROR")
          }
          setLoading(false)
        }
        catch(error){
          console.log(error)
        }
    }

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary 
        hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={()=> setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Tell us more about Job you are Interviewing</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    <h2>Add details about your job position/role, Job description and Experince</h2>
                    <div className='mt-7 my-3'>
                        <label>Job Role/Job Position</label>
                        <Input placeholder="Ex. Full Stack Developer" required
                        onChange={(event)=>setJobPosition(event.target.value)}
                        />
                    </div>
                    <div className='my-3'>
                        <label>Job Description/ Tech Stack</label>
                        <Textarea placeholder="Ex. React, Angular" required
                        onChange={(event)=>setJobDescription(event.target.value)}
                        />
                    </div>
                    <div className=' my-3'>
                        <label>Years of Experience</label>
                        <Input placeholder="Ex. 5" type="number" max="50" required
                        onChange={(event)=>setJobExp(event.target.value)}
                        />
                    </div>
                </div>
              <div className='flex gap-5 justify-end'>
                <Button type="button" variant='ghost' onClick={()=> setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {
                    loading ? <>
                    Generating Questions<Loader/>
                    </> : 'Start Interview'
                  }
                  </Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview