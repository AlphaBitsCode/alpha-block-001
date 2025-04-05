
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Search, FileQuestion, Send, BookOpen, TicketCheck } from "lucide-react";
import { toast } from "sonner";

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupportDialog: React.FC<SupportDialogProps> = ({ open, onOpenChange }) => {
  const isMobile = useIsMobile();
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support ticket submitted", {
      description: "Our team will get back to you shortly",
      icon: <TicketCheck size={18} />
    });
    onOpenChange(false);
  };
  
  const supportContent = (
    <Tabs defaultValue="knowledge-base" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="knowledge-base">
          <BookOpen size={16} className="mr-2" />
          Knowledge Base
        </TabsTrigger>
        <TabsTrigger value="support-ticket">
          <TicketCheck size={16} className="mr-2" />
          Submit Ticket
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="knowledge-base" className="mt-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search knowledge base..." 
            className="pl-10"
          />
        </div>
        
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-background/20">
            <h3 className="text-sm font-medium flex items-center">
              <FileQuestion size={16} className="mr-2" />
              How to optimize humidity for mushroom growing?
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Maintaining humidity levels between 80-90% is optimal for most mushroom varieties. Use a humidifier to increase humidity and monitor regularly.
            </p>
          </div>
          
          <div className="rounded-lg border p-4 bg-background/20">
            <h3 className="text-sm font-medium flex items-center">
              <FileQuestion size={16} className="mr-2" />
              Understanding temperature control for Pink Oysters
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Pink Oyster mushrooms thrive in temperatures between 18-24°C (64-75°F). Avoid temperature fluctuations for optimal growth.
            </p>
          </div>
          
          <div className="rounded-lg border p-4 bg-background/20">
            <h3 className="text-sm font-medium flex items-center">
              <FileQuestion size={16} className="mr-2" />
              Troubleshooting common growth issues
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              If your mushrooms are growing slowly or showing discoloration, check humidity levels, air circulation, and substrate moisture content.
            </p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="support-ticket" className="mt-4">
        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <Input id="subject" placeholder="Brief description of your issue" required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description" 
              placeholder="Please provide details about your issue..." 
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select 
              id="category"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              required
            >
              <option value="">Select a category</option>
              <option value="technical">Technical Issue</option>
              <option value="growing">Growing Problem</option>
              <option value="equipment">Equipment Malfunction</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center">
              <Send size={16} className="mr-2" />
              Submit Ticket
            </Button>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
  
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-black/90 border-t border-white/20 text-white max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Support Center</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            {supportContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border border-white/20 text-white max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Support Center</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          {supportContent}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;
