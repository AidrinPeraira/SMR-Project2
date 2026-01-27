import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

type Props = {
  title: string;
  type: "button" | "submit" | "reset" | undefined;
  isPending: boolean;
};

function LoaderButton({ title, type = "button", isPending = false }: Props) {
  return (
    <Button type={type} disabled={isPending}>
      {isPending ? <Spinner /> : title}
    </Button>
  );
}

export default LoaderButton;
