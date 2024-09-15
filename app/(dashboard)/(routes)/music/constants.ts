import * as z from "zod"

export const formSchema = z.object({
    prompt : z.string().min(1, {
        message : "Music prompt is required"

    }),

    duration: z.string().min(1)
});

export const durationOptions = [
    {
        value : "2",
        label : "2 Seconds"
    },

    {
        value : "4",
        label : "4 Seconds"
    },

    {
        value : "6",
        label : "6 Seconds"
    },

    {
        value : "8",
        label : "8 Seconds"
    },

    {
        value : "10",
        label : "10 Seconds"
    }
]

export const resolutionOptions = [
    {
        value : "256 x 256",
        label : "256 x 256"
    },
    {
        value : "512 x 512",
        label : "512 x 512"
    },
    {
        value : "1024 x 1024",
        label : "1024 x 1024"
    }
]