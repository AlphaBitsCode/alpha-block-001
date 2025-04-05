
import React, { useEffect, useState } from "react";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger 
} from "@/components/ui/navigation-menu";
import { getUserName } from "./UserNamePrompt";
import { UserRound } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const NavigationMenuComponent: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Get the username on mount and also set up a listener for storage changes
    const updateUserName = () => {
      const name = getUserName();
      setUserName(name);
    };
    
    updateUserName();
    window.addEventListener("storage", updateUserName);
    
    // Also listen for custom events for when username changes
    window.addEventListener("usernameChanged", updateUserName);
    
    return () => {
      window.removeEventListener("storage", updateUserName);
      window.removeEventListener("usernameChanged", updateUserName);
    };
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`px-3 py-1 font-medium flex items-center gap-2 ${
            theme === "light" ? 'bg-white text-gray-800' : 'bg-primary/10 text-white'
          }`}>
            <UserRound size={16} />
            <span className="max-w-[150px] truncate">{userName || "Guest"}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={`w-[200px] p-4 ${
              theme === "light" ? 'bg-white text-gray-800' : 'bg-popover text-popover-foreground'
            }`}>
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
