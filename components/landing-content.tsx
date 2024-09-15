import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const testimonials = [
    {
        name : "Antonio",
        avatar : "A",
        title : "Software Engineer",
        description : "This is the best AI application I have used."
    },
    {
        name : "Mark",
        avatar : "B",
        title : "Student",
        description : "Great tool for my academics."
    },
    {
        name : "Claire",
        avatar : "C",
        title : "IT Manager",
        description : "Makes my daily life so much easier."
    },
    {
        name : "Steve",
        avatar : "D",
        title : "FreeLancer",
        description : "Very handy application with eye-catching design."
    }
]

const LandingContent = () => {
  return (
    <div className='px-20 py-15'>
        <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
            Testimonials
        </h2>

        <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) => (
                <Card 
                    key = {item.description}
                    className = "bg-[#192339] border-none text-white mx-5"
                >
                    <CardHeader>
                        <CardTitle className='flex items-center gap-x-2'>
                            <div>
                                <p className='text-lg'>{item.name}</p>
                                <p className = "text-zinc-400 text-sm">{item.title}</p>
                            </div>

                        </CardTitle>
                        <CardContent className='pt-1 px-0'>
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>

            ))}
        </div>

    </div>
  )
}

export default LandingContent
