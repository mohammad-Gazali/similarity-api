import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";



const LargeHeadingVariants = cva(
	"text-black dark:text-white lg:text-left text-center font-extrabold leading-tight tracking-tighter",
	{
		variants: {
			size: {
				default: "lg:text-6xl md:text-5xl text-4xl",
				lg: "lg:text-7xl md:text-6xl text-5xl",
				sm: "lg:text-4xl md:text-3xl text-2xl",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
);


interface LargeHeadingProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof LargeHeadingVariants> {}


const LargeHeading = forwardRef<HTMLHeadingElement, LargeHeadingProps>(({
    className, size, children, ...props
}, ref) => {
	return(
    <h1
    ref={ref} 
    {...props}
    className={cn(
        LargeHeadingVariants({ className, size })
    )}
    >
        {children}
    </h1>
    )
});


// for debugging
LargeHeading.displayName = "LargeHeading";


export default LargeHeading;
