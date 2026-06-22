import { ThemeDialogContent } from "../dialogs";
import type { Command } from "./types";

export const COMMANDS: Command[]=[
  {
    name:"new",
    description:"start a new conversation",
    value:"/new",
    action: (ctx)=>{
      ctx.toast.show({ message: "Starting new conversation" });
    },
  },
  {
    name:"models",
    description:"set the model to use",
    value:"/models",
    action: (ctx)=>{
      ctx.dialog.open({
        title: "Select Model",
        children: <text>Model selection coming soon</text>
      })
    },
  },
  {
    name:"agents",
    description:"set agents",
    value: "/agents",
    action: (ctx)=>{
      ctx.dialog.open({
        title: "Select Mode",
        children: <text> To do agent selection</text>
      })
    },
  },
  {
    name:"session",
    description:"set session",
    value: "/session",
    action: (ctx)=>{
      ctx.toast.show({ message: "Setting session" });
    },
  },
  {
    name:"theme",
    description:"set the theme",
    value:"/theme",
    action: (ctx) => {
      ctx.dialog.open({
        title: "Select Theme",
        children: <ThemeDialogContent/>,
      })
    }
  },
  {
    name:"login",
    description:"login to the application",
    value: "/login",
    action: (ctx)=>{
      ctx.toast.show({ message: "Logging in" });
    },
  },
  {
    name:"logout",
    description:"logout of the application",
    value:"/logout",
    action: (ctx)=>{
      ctx.toast.show({ message: "Logging out" });
    },
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
