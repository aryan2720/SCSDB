import React from 'react'
import Card from './Card'

export const HorizontalCards = ({data, category}) => {
  return data.length>0?(<div className='w-full h-[40vh] px-2 py-3 flex items-center gap-[1vw] overflow-y-hidden'>
    {data.map((d, i)=><Card key={i} data={d} title={category} />)}
</div>
  ):<h1 className='text-white tracking-tight '>Nothing to show</h1>
}
