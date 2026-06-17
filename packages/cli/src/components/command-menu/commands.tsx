import type { Command } from "./types";

export const COMMANDS: Command[]=[
  {
    name:"new",
    description:"start a new conversation",
    value:"/new",
  },
  {
    name:"models",
    description:"set the model to use",
    value:"/models",
  },
  {
    name:"agents",
    description:"set agents",
    value:"/agents",
  },
  {
    name:"session",
    description:"set session",
    value:"/session",
  },
  {
    name:"theme",
    description:"set the theme",
    value:"/theme",
  },
  {
    name:"login",
    description:"login to the application",
    value:"/login",
  },
  {
    name:"logout",
    description:"logout of the application",
    value:"/logout",
  },
  {
    name:"usage",
    description:"show command usage",
    value:"/usage",
  },
  {
    name:"exit",
    description:"exit the application",
    value:"/exit",
    action: (ctx)=>{
      ctx.exit();
    }
  },
]
