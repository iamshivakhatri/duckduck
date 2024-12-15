"use client";

import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const folderRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false)

  const rename = () => setOnRename(true);
  const renamed = () => setOnRename(false);

  //optimistic 
  const {mutate, isPending} = useMutationData(
    ['rename-folders'],
    (data:{name:string})=>( renameFolders(id, data.name)),
    'workspace-folders',
    renamed
  )

  

  const handleFolderClick = () => {
    if(onRename) return
    router.push(`${pathname}/folder/${id}`);
  }

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    rename()
  }

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id })
      } else renamed()
    }
  }

  //TODO: Add loading state

  return (
    <div
    onClick={() => handleFolderClick()}
    ref={folderRef}
    className={cn(
       optimistic && 'opacity-60',
      `flex hover:bg-neutral-800 cursor-pointer transition 
       duration-150 items-center gap-2 justify-between 
       min-w-[200px] py-4 px-4 rounded-lg border-[1px]`
    )}
  >
      <FolderDuotone />
      <Loader state={isPending}>
        <div className="flex flex-col gap-[1px]">
            {onRename? 
            <Input 
            autoFocus
            placeholder={name}
            ref={inputRef} 
            className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => updateFolderName(e)}
            /> 
            :
            <>
            <p
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => handleNameDoubleClick(e)}
             className="text-neutral-300 ">
                {name}
            </p>
            </>
            }
            <span className="text-neutral-500 text-sm">{count ? count : 0} videos</span>


        </div>

      </Loader>
    </div>
  );
};

export default Folder
