import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function NewPersonalizedFeedDialog({
  onSubmit,
}: {
  onSubmit: (feedName: string) => void;
}) {
  const [feedName, setFeedName] = useState("");

  function handleSubmit() {
    onSubmit(feedName);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full text-red-500" variant="outline">
          Save Personalized Feed
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Save Personalized Feed</DialogTitle>
          <DialogDescription>
            Enter a name for your personalized feed and save it!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="feed-name">Name</Label>
          <Input
            id="feed-name"
            className="col-span-3"
            value={feedName}
            onChange={(e) => setFeedName(e.target.value)}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="default">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-red-500 text-white hover:bg-red-600 transition duration-300"
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
