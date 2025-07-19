"use client";

import { useFormChat } from "../hooks/useFormChat";
import { AIAgent } from "./AIAgent";
import { FormInput } from "./FormInput";

export const FormCard = () => {
  const {
    formData,
    messages,
    isLoading,
    currentFieldIndex,
    updateFormField,
    sendMessage,
  } = useFormChat();

  return (
    <div className="flex flex-col justify-center max-w-6xl mx-auto border-x border-dotted border-white/20 w-full h-screen">
      <div className="hidden lg:block">
        <h1 className="text-center text-lg font-semibold">AI Copilot</h1>
        <p className="text-white/50 text-xs text-center">
          Your intelligent form assistant
        </p>
      </div>
      <div className="lg:hidden block">
        <h1 className="text-center">In Progress...</h1>
      </div>
      <div className="p-5 grid lg:grid-cols-2">
        <div className="lg:border-r lg:border-white/20 lg:pr-5 hidden lg:block">
          <FormInput
            formData={formData}
            currentFieldIndex={currentFieldIndex}
            onUpdateField={updateFormField}
          />
        </div>
        <div className="lg:pl-5 hidden lg:block">
          <AIAgent
            messages={messages}
            isLoading={isLoading}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};
