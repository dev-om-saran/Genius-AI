"use client";

import * as z from "zod";
import React, { useState } from 'react';
import { Heading } from '@/components/heading';
import { ImageIcon, Music} from 'lucide-react';
import { useForm } from "react-hook-form";
import { formSchema, durationOptions,resolutionOptions  } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";


interface Message {
  role: string;
  content: string;
}

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [music, setMusic] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      duration : "2"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      setMusic(undefined);
      
      
      console.log(values)
      // Send a single concatenated prompt to the server
      const response = await axios.post("/api/music",values);
      
      //console.log(response)
      setMusic(response.data)
      //console.log(music)
  
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
        title="Music Generation"
        description="From words to SaReGaMa...."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl>
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Drum beats with flute"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value || ""}  // Ensure the value is controlled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>{field.value || "Select amount"}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

            {music && music.length ==0 && !isLoading && (
                <Empty label = "Enter prompt to generate music"/>
            )}

            {music && (
              <audio controls 
              className="w-full mt-8">
                <source src = {music}/>
              </audio>
            )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
