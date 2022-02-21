import AuthProvider from "next-auth/providers/facebook";
import { assert } from "utils/common";

assert(process.env.FACEBOOK_CLIENT_ID, "You must provide the FACEBOOK_CLIENT_ID env variable");
assert(
  process.env.FACEBOOK_CLIENT_SECRET,
  "You must provide the FACEBOOK_CLIENT_SECRET env variable"
);

export const FacebookAuthProvider = AuthProvider({
  clientId: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
});
