import { Icons, UserAuthForm } from "@/components"
import { buttonVariants } from "@/components/ui/Button"
import LargeHeading from "@/components/ui/LargeHeading"
import Paragraph from "@/components/ui/Paragraph"
import Link from "next/link"
import { FC } from "react"


const page: FC = () => {
  return (
    <section className="absolute inset-0 mx-auto container flex h-screen flex-col justify-center items-center">
        <div className="mx-auto w-full flex flex-col justify-center gap-6 max-w-lg">
            <div className="flex flex-col items-center gap-6 text-center">
                <Link href="/" className={buttonVariants({ variant: "ghost", className: "w-fit" })}>
                    <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                    Back to home
                </Link>
                <LargeHeading>Welcome back!</LargeHeading>
                <Paragraph>Please sign in using your Github account.</Paragraph>
            </div>
            <UserAuthForm />
        </div>
    </section>
  )
}

export default page