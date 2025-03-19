import { LightbulbIcon, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {

    const textToSpeech = (text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry, Your browser does not support for this feature')
        }
    }

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion && mockInterviewQuestion.interviewQuestions.map((question, index) => (
                <h2 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer
                    ${activeQuestionIndex === index ? 'bg-amber-500 text-white' : 'bg-secondary text-black'}`}
                >Question #{index + 1}</h2>
            ))}

        </div>

        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion?.interviewQuestions[activeQuestionIndex]?.question}</h2>

        <Volume2 className='cursor-pointer' onClick={()=>textToSpeech(mockInterviewQuestion?.interviewQuestions[activeQuestionIndex]?.question)}/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
            <h2 className='flex gap-2 items-center text-blue-600'>
                <LightbulbIcon />
                    <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-blue-900 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div>

  )
}

export default QuestionsSection