
import React, { useEffect, useState } from "react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { getUserName } from "./UserNamePrompt";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const NavigationMenuComponent: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Get the username on mount and also set up a listener for storage changes
    const updateUserName = () => {
      setUserName(getUserName());
    };
    
    updateUserName();
    window.addEventListener("storage", updateUserName);
    
    return () => {
      window.removeEventListener("storage", updateUserName);
    };
  }, []);

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary/10 px-3 py-1 font-medium flex items-center gap-2">
            <UserRound size={16} />
            {userName || "Guest"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[200px] p-2">
              <div className="grid gap-2">
                <div className="font-medium">
                  {userName ? `Welcome, ${userName}` : "Welcome, Guest"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Alpha Block Operator
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenuComponent;
