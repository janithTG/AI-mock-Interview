"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params?.interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

      <div className="flex flex-col my-5 gap-5">
        <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg"><strong>Job Role/Job Position: </strong>{interviewData?.jobPosition.toUpperCase()}</h2>
            <h2 className="text-lg"><strong>Job Description/Tech Stack: </strong>{interviewData?.jobDesc.toUpperCase()}</h2>
            <h2 className="text-lg"><strong>Experience: </strong>{interviewData?.jobExperince}</h2>
        </div>

        <div className="p-5 border rounded-lg border-amber-400 bg-amber-200">
            <h2 className="flex gap-2 item-center text-yellow-600"><Lightbulb/><strong>Information</strong></h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
      </div>
      <div>
        {webCamEnabled ? <Webcam
        onUserMrdia={()=> setWebCamEnabled(true)}
        onUserMediaError={()=> setWebCamEnabled(false)}
        mirrored={true}
            style={{
                height:300,
                width:300
            }}
        />
        :
        <>
        <div className="flex justify-center flex-col items-center">
        <WebcamIcon className='my-5 p-10 h-42 w-full bg-secondary rounded-lg border'/>
        <Button variant='ghost' className='w-full' onClick={()=>setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
        </div>
        </>

        }
      </div>
    </div>

    <div className="flex justify-end items-end">
    <Button>Start Interview</Button>
    </div>
    </div>
  );
}

export default Interview;
