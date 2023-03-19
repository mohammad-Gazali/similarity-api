import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";



const paragraphVariants = cva(
	"max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center",
	{
		variants: {
			size: {
				default: "sm:text-lg text-base",
				sm: "sm:text-base text-sm",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
);


interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}


//? "forwardRef" is a built-in react function that can add the "ref" attribute to the component with all functionalities that "ref" attribute has
//?
//? "forwardRef" accept the component whom we want to add the "ref" attribute as an argument
//?
//? "forwardRef" accept two Generics: 
//?     1- the type of element we want to render (which is here HTMLParagraphElement)
//?     2- the type of props we want to pass to the component (which is here ParagraphProps)


const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({
    className, size, children, ...props
}, ref) => {
	return(
    <p 
    ref={ref} 
    {...props}
    className={cn(
        paragraphVariants({ className, size })
    )}
    >
        {children}
    </p>
    )
});


// for debugging
Paragraph.displayName = "Paragraph";


export default Paragraph;
