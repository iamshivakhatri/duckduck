import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useCreateWorkSpace } from '@/hooks/use-createworkspace'
import React from 'react'

type Props = {}

const workSpaceForm = (props: Props) => {
    const {errors, isPending, onFormSubmit, register} = useCreateWorkSpace()
  return (
   <form onSubmit={onFormSubmit} className='flex flex-col gap-y-3'>
     <FormGenerator
     label='Workspace Name'
     name='name'
     type='text'
     placeholder= {'Workspace Name'}
     register={register}
     errors={errors}
     inputType='input'
     />
     <Button className='text-sm w-full mt-2' type='submit' disabled={isPending}>
        <Loader state={isPending}>Create a Workspace</Loader>

     </Button>
   </form>
  )
}

export default workSpaceForm