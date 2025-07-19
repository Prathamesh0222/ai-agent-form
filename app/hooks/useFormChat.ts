"use client";

import { useState } from "react";

export interface FormData {
  username: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export type FormField = keyof FormData;

const FORM_FLOW: { field: FormField; label: string; prompt: string }[] = [
  {
    field: "username",
    label: "Username",
    prompt:
      "Let's start with your username. What would you like your username to be?",
  },
  {
    field: "email",
    label: "Email",
    prompt: "Great! Now I need your email address. What's your email?",
  },
  {
    field: "linkedinUrl",
    label: "LinkedIn URL",
    prompt: "Perfect! Next, could you share your LinkedIn profile URL?",
  },
  {
    field: "githubUrl",
    label: "GitHub URL",
    prompt: "Finally, what's your GitHub profile URL?",
  },
];

export const useFormChat = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text:
        "Hello! I'm your AI form assistant. I'll help you fill out your profile form step by step. " +
        FORM_FLOW[0].prompt,
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const moveToNextField = () => {
    if (currentFieldIndex < FORM_FLOW.length - 1) {
      setCurrentFieldIndex((prev) => prev + 1);
      return false;
    } else {
      setIsFormComplete(true);
      return true;
    }
  };

  const getCurrentField = () => {
    return FORM_FLOW[currentFieldIndex];
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const currentField = getCurrentField();

      const extractedValue = extractValueForCurrentField(
        message,
        currentField.field
      );

      if (extractedValue) {
        updateFormField(currentField.field, extractedValue);

        const isComplete = moveToNextField();

        let responseText = `Perfect! I've filled in your ${currentField.label.toLowerCase()}: ${extractedValue}`;

        if (!isComplete && currentFieldIndex + 1 < FORM_FLOW.length) {
          const nextField = FORM_FLOW[currentFieldIndex + 1];
          responseText += ` \n\n${nextField.prompt}`;
        } else if (isComplete) {
          responseText +=
            " \n\nExcellent! Your form is now complete. You can review and submit it whenever you're ready.";
        }

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `I couldn't extract your ${currentField.label.toLowerCase()} from that message. Could you please provide your ${currentField.label.toLowerCase()} more clearly?`,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble processing your request right now. Could you try again?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractValueForCurrentField = (
    message: string,
    field: FormField
  ): string => {
    const lower = message.toLowerCase().trim();
    const words = message.trim().split(/\s+/);

    switch (field) {
      case "username": {
        if (lower.includes("username is")) {
          return lower.split("username is")[1].trim();
        }
        if (lower.includes("call me")) {
          return lower.split("call me")[1].trim();
        }
        if (lower.startsWith("i am ")) {
          return lower.split("i am ")[1].trim();
        }
        if (lower.startsWith("i'm ")) {
          return lower.split("i'm ")[1].trim();
        }
        if (words.length === 1) return words[0];
        return "";
      }

      case "email": {
        const emailWord = words.find(
          (word) => word.includes("@") && word.includes(".")
        );
        return emailWord || "";
      }

      case "linkedinUrl": {
        const link = words.find((w) => w.includes("linkedin.com/in/"));
        if (link) return link.startsWith("http") ? link : `https://${link}`;
        return "";
      }

      case "githubUrl": {
        const link = words.find((w) => w.includes("github.com/"));
        if (link) return link.startsWith("http") ? link : `https://${link}`;
        return "";
      }

      default:
        return "";
    }
  };

  return {
    formData,
    messages,
    isLoading,
    currentFieldIndex,
    isFormComplete,
    updateFormField,
    sendMessage,
    getCurrentField,
  };
};
