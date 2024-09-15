"use client";

import * as z from "zod";
import React, { useState } from 'react';
import { Heading } from '@/components/heading';
import { ImageIcon} from 'lucide-react';
import { useForm } from "react-hook-form";
import { formSchema, amountOptions,resolutionOptions  } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import { useProModal } from "@/hooks/use-pro-modal";


interface Message {
  role: string;
  content: string;
}

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();

  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      num_outputs : "1"
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      setImages([]);
      
      
      console.log(values)
      // Send a single concatenated prompt to the server
      const response = await axios.post("/api/image",values);

      console.log(response.data)
      console.log(response.data[0])
      //const urls = response.data.map((image : {url : string}) => image.url);



      setImages(response.data)

      console.log(images)
  
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
        title="Image Generation"
        description="Transform your thoughts into pixels."
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
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
                        placeholder="Orange cat fighting with a dog"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="num_outputs"
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
                        {amountOptions.map((option) => (
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

            {images.length ==0 && !isLoading && (
                <Empty label = "Enter prompt to generate image"/>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {images.map((src1) =>(

                  <Card
                    key = {src1}
                    className="rounded-lg overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      { src1 && (<Image 
                        alt = "Image"
                        fill
                        src = {src1}
                      />) }
                    </div>

                    <CardFooter className="p-2">
                      <Button
                        onClick={()=>window.open(src1)}
                        variant = "secondary"
                        className="w-full"
                      >
                        Download
                      </Button>

                    </CardFooter>
                  </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
