import { BotIcon } from "../icons/BotIcon";
import { SendIcon } from "../icons/SendIcon";
import { UserIcon } from "../icons/UserIcon";
import { Input } from "./Input";

export const AIAgent = () => {
  return (
    <div className="flex flex-col h-full justify-between w-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="flex justify-start items-center gap-3">
          <BotIcon />
          <div className="bg-white border text-black p-3 rounded-lg max-w-xs">
            <p className="text-sm mr-4">
              Hello! I'm your AI assistant. I can help you fill out this form.
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <div className="text-white border border-border/50 border-white/20 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hi! Can you help me with my LinkedIn profile?
            </p>
          </div>
          <UserIcon />
        </div>
        <div className="flex justify-start items-center gap-3">
          <BotIcon />
          <div className="bg-white border text-black p-3 rounded-lg max-w-xs">
            <p className="text-sm mr-4">
              Of course! Please provide your LinkedIn URL and I'll help you fill
              out the form.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 px-4 border-white/20">
        <div className="flex-1">
          <Input width="full" placeholder="Type your message..." />
        </div>
        <SendIcon />
      </div>
    </div>
  );
};
