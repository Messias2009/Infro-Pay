import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cashout")({
  beforeLoad: () => {
    throw redirect({ to: "/produtor/saques" });
  },
});
