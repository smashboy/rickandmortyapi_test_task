import { getSession } from "next-auth/react";
import { useQuery } from "react-query";

function getSessionHelper() {
  return getSession();
}

export function useSession() {
  const session = useQuery("session", getSessionHelper, {
    refetchOnWindowFocus: true,
  });

  return session;
}
