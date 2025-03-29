import React from 'react'

const PriceForm = () => {
  return (

    <section className='flex'>
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-14'>
                <div className='flex flex-col gap-1 items-start justify-center'>
                    <span>PRODUTO</span>
                    <input type='text' className='focus:outline-none w-[380px] h-16 border-2 border-coral rounded-lg px-4'/>
                </div>

                <div className='flex flex-col gap-1 items-start justify-center'>
                    <span>DESCRIÇÃO</span>
                    <textarea className='focus:outline-none resize-none w-[380px] h-52 border-2 border-coral rounded-lg p-4 align-text-top'/>
                </div>
            </div>
            <button className='w-40 h-12 text-center bg-[#FFC2C2] rounded-xl hover:bg-coral hover:text-white transition-all active:scale-95 ease-in-out duration-300 cursor-pointer'>CONFIRMAR</button>
        </div>

        <div>
            
        </div>
    </section>

  )
}

export default PriceForm