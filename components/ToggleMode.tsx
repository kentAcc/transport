"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { icons, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { draftMode } from "next/headers";

const ToogleMode = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = theme === "dark";

  return (
    <>
      {mounted && (
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
        >
          {dark ? (
            <Sun className="hover:cursor-pointer hover:text-primary"></Sun>
          ) : (
            <Moon className="hover:cursor-pointer hover:text-primary"></Moon>
          )}
        </Button>
      )}
    </>
  );
};
export default ToogleMode;
