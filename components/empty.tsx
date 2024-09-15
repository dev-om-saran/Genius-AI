import React from 'react'
import Image from 'next/image';

interface EmptyProps {
    label: string;
}

const Empty = ({
    label
}: EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
        <div className='relative h-72 w-72 rounded-lg'>
            <Image 
                alt = "Empty"
                fill
                src = "/empty3.png"
            />
        </div>
        <p className='text-muted-foreground text-sm text-center py-6'>
            {label}
        </p>
    </div>
  )
}

export default Empty