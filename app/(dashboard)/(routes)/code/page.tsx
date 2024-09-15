"use client";

import * as z from "zod";
import React, { useState } from 'react';
import { Heading } from '@/components/heading';
import { Code, CodeIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";


interface Message {
  role: string;
  content: string;
}

const CodePage = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Create a message from the form input
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
  
      // Update the message list
      const newMessages = [...messages, userMessage];
  
      // Send a single concatenated prompt to the server
      const response = await axios.post("/api/code", {
        prompt: newMessages.map((message) => message.content).join("\n"), // Concatenate messages
      });
  
      //console.log("Response from Gemini API:", response);
  
      // Update the message list with the assistant's response
      setMessages((current) => [
        ...current,
        userMessage,
        { role: "assistant", content: response.data.message },
      ]);
  
      // Reset form after submission
      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403){
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading 
        title="Code generation"
        description="Your Personal Software Developer."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg
                border
                w-full
                p-4
                px-3
                md:px-6
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Simple toggle button using react hooks"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
            {isLoading && (<div className= "p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader/>
            </div>)}

            {messages.length ==0 && !isLoading && (
                <Empty label = "No conversation started"/>
            )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div 
                key={message.content}
                className= {cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role=== "user" ? "bg-white border border-black/10" : "bg-muted"

                )}
                >
                {message.role ==='user' ? <UserAvatar/> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre : ({node, ...props}) => (
                      <div
                      className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props}/>
                      </div>
                    ),
                    code : ({node, ...props}) => (
                      <code
                      className="bg-black/10 rounded-lg p-1" {...props} />
                    )
                  }}

                  className= "text-sm overflow-hidden leading-7"
                >
                  {message.content} 
                </ReactMarkdown>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
