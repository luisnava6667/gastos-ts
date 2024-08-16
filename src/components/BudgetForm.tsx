import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { useBudget } from '../hooks/useBudget'

export default function BudgetForm() {
  const [budget, setBubget] = useState(0)
  const {  dispatch } = useBudget()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBubget(e.target.valueAsNumber)
  }
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type:'add-budget', payload:{budget}})
    console.log('Añadir o definir Presupuesto')
  }
  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'>
          Definir Presupuesto
        </label>
        <input
          id='budget'
          type='number'
          className='w-full bg-white border border-gray-200 p-2'
          placeholder='Define tu Presupuesto'
          name='budget'
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type='submit'
        className='bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40'
        value='Definir Presupuesto'
        disabled={isValid}
      />
    </form>
  )
}
