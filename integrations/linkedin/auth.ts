import AuthProvider from "next-auth/providers/linkedin";
import { assert } from "utils/common";

assert(process.env.LINKEDIN_CLIENT_ID, "You must provide the LINKEDIN_CLIENT_ID env variable");
assert(
  process.env.FACEBOOK_CLIENT_SECRET,
  "You must provide the LINKEDIN_CLIENT_SECRET env variable"
);

export const LinkedinAuthProvider = AuthProvider({
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
});
