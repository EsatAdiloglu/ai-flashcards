import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { FirestoreAdapter } from "@auth/firebase-adapter"
import { firestore } from "@/lib/firestore"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(firestore),
  session: { strategy: 'jwt' },
  callbacks: {
    jwt: async ({ token, account }) => {
      if(account && account.userId) {
        token.id = account.userId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Forward token contents
      return { ...session, 
        id: token.id
      }
  },

  },
  ...authConfig
})