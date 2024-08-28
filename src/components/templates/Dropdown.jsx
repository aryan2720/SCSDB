import React from 'react'

function Dropdown({title, options, setCat}) {
  return (
    <div>
        <select onChange={(e)=>setCat(e.target.value)} className='hover:text-zinc-300 capitalize duration-300 w-fit rounded-lg px-2 py-1 outline-none bg-[#18181B] tracking-tighter font-normal text-zinc-200' name="select" id="select">
            <option className='text-xl text-zinc-300 tracking-tighter px-1' value="0" disabled>{title}</option>
            {options.map((o, i)=><option key={i} className='text-xl text-zinc-300 tracking-tighter px-1 capitalize' value={`${o}`}>{o}</option>)}
        </select>
    </div>
  )
}

export default Dropdown