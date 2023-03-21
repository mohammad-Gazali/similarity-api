import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.cachedPrisma) {
      global.cachedPrisma = new PrismaClient();
    }

    prisma = global.cachedPrisma;
  }
}

//! IMPORTANT
//? when you facing the error "Error: PrismaClient is unable to be run in the browser." then you should to make sure that PrismaClient will run only in the server and you can do it by wrapping your logic by the condition [[  if (typeof window === "undefined")  ]]
//?
//? From ninest in https://github.com/prisma/prisma/issues/5795:
//?               '''' Use if (typeof window === "undefined") { to run code on the server but not on the browser ''''

export const db = prisma!;