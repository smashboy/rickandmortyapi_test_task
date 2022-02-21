import NextAuth from "next-auth";
import { FacebookAuthProvider } from "integrations/facebook/auth";
import { LinkedinAuthProvider } from "integrations/linkedin/auth";

export default NextAuth({
  providers: [FacebookAuthProvider, LinkedinAuthProvider],
});
