import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import { Input } from "@/ui/Input";
import { ApiKeyOptions, Table } from "@/components";



const ApiDashboard = async () => {

  const session = await getServerSession(authOptions);
  
  if (!session) notFound()

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: session.user.id
    }
  })

  const activeApiKey = apiKeys.find(apiKey => apiKey.enabled)

  if (!activeApiKey) notFound()

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map(key => key.id)
      }
    }
  })

  const serializableRequests = userRequests.map((req) => {
    return {
      ...req,
      timestamp: formatDistance(new Date(req.timestamp), new Date())  //? "formatDistance" return the date in human readable form like "one hour ago", it accept the date we want to format as the first arg, and the reference date as the second arg
    }
  })

  return (
    <section className="container flex flex-col gap-6">
      <LargeHeading>
        Welcome Back {session.user.name}
      </LargeHeading>
      <div className="flex md:flex-row flex-col gap-4 md:justify-start justify-center items-center">
        <Paragraph>
          Your API key:
        </Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKeyId={activeApiKey.id} apiKeyKey={activeApiKey.key} />
      </div>
      <Paragraph className="md:text-left text-center mt-4 -mb-4">
        Your API history:
      </Paragraph>
      <Table userRequests={serializableRequests} />
    </section>
  )
}

export default ApiDashboard