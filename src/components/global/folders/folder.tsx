"use client";

import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/actions/workspace";

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

  //optimistic rename
  const {mutate: renameFolder} = useMutationData(
    ['rename-folders'],
    (data:{name:string})=>renameFolders(id, name),
    'workspace-folders',
    renamed
  )

  

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  }

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    console.log('double click')
  }

  //TODO: Add loading state

  return (
    <div
    onClick={() => handleFolderClick()}
    className={cn(
      `flex hover:bg-neutral-800 cursor-pointer transition 
       duration-150 items-center gap-2 justify-between 
       min-w-[200px] py-4 px-4 rounded-lg border-[1px]`
    )}
  >
      <FolderDuotone />
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
            <p
            onDoubleClick={(e) => handleNameDoubleClick(e)}
             className="text-neutral-300 ">
                {name}
            </p>
            <span className="text-neutral-500 text-sm">{count ? count : 0} videos</span>

        </div>

      </Loader>
    </div>
  );
};

export default Folder;
