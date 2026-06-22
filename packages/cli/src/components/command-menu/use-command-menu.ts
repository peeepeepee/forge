import { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { useMemo, useRef, useState, type RefObject } from "react";
import { getFilteredCommands } from "./filter-commands";
import type { Command } from "./types";
import { useKeyboardLayer } from "../../providers/keyboard-layer";

type UseCommandMenuReturn = {
    showCommandMenu: boolean;
    commandQuery: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBoxRenderable | null>;
    handleContextChange: (text:string)=> void;
    resolveCommand: (index:number) =>Command|undefined;
    setSelectedIndex: (index: number) => void;
}

export function useCommandMenu(): UseCommandMenuReturn {
   const [textValue, setTextValue]=useState("");
   const [selectedIndex, setSelectedIndex]=useState(0);
   const [showCommandMenu, setshowCommandMenu]=useState(false);
   const scrollRef = useRef<ScrollBoxRenderable>(null);
   const {push, pop, isTopLayer} = useKeyboardLayer();

  const close = () => {
    setshowCommandMenu(false)
    pop("command");
}

   const commandQuery = showCommandMenu && textValue.startsWith("/")?textValue.slice(1):"";
   const filteredCommands = useMemo(()=> getFilteredCommands(commandQuery), [commandQuery])
   const handleContextChange = (text:string) => {
       setTextValue(text);
       setSelectedIndex(0);
       const scrollBox=scrollRef.current;
       if(scrollBox){
           scrollBox.scrollTo(0)
       }
       const prefix=text.startsWith("/")? text.slice(1):null
       if(prefix!=null && !prefix.includes(" ")){
           setshowCommandMenu(true)
         push("command", () => {
           close()
           return true;
           })
       }else{
        close();
       }
   }
  const resolveCommand = (index: number): Command | undefined => {
       const command = filteredCommands[index];
     if (command) {
       close()
     }
     return command;
  }
  useKeyboard((key) => {
    if (!showCommandMenu || !isTopLayer("command")) return;

    if(key.name==="escape"){
      key.preventDefault();
      close()
    } else if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        const newindex = Math.max(0, i - 1);

        const sb = scrollRef.current;
        if (sb && newindex < sb.scrollTop) {
          sb.scrollTo(newindex);
        }
        return newindex;
      })
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        if (filteredCommands.length === 0) {
          return 0;
        }
        const newindex = Math.min(filteredCommands.length - 1, i + 1);
        const sb = scrollRef.current;
        if (sb) {
          const viewportHeight = sb.viewport.height;
          const visibleEnd = sb.scrollTop + viewportHeight - 1;
          if (newindex > visibleEnd) {
            sb.scrollTo(newindex - viewportHeight + 1);
          }
        }
        return newindex;
      });

    }
  });
  return {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContextChange,
    resolveCommand,
    setSelectedIndex,
  };
};
