import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";


//? "twMerge" is for more optimizaing for tailwindcss classes
//? for example:
//? if we have "py-5" and "px-5" in our classes then "twMerge" will make them "p-5"

//? "clsx" is function for handling conditional behavior when we use "className" attribute
//? so if we have a lot of classes we passed for example like this:
//?         className={`${open ? "open-class" : "close-class"}`}
//? then the result will converted to a normal class, so in the previous example:
//?    when open = true  ----> clsx(`${open ? "open-class" : "close-class"}`) will return "open-class"
//?    when open = false  ----> clsx(`${open ? "open-class" : "close-class"}`) will return "close-class"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}