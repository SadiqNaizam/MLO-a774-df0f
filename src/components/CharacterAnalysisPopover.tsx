import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from '@/components/ui/separator';

interface CharacterAnalysisPopoverProps {
  character: string;
  pinyin: string;
  definition: string;
  // Could add more details like radical, stroke count, example words etc.
  trigger: React.ReactNode; // The element that, when hovered/clicked, shows the popover
}

export const CharacterAnalysisPopover: React.FC<CharacterAnalysisPopoverProps> = ({
  character,
  pinyin,
  definition,
  trigger,
}) => {
  console.log("Rendering CharacterAnalysisPopover for:", character);

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-64 z-50"> {/* Ensure popover appears above other content */}
        <div className="space-y-2">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-primary">{character}</h3>
            <p className="text-sm text-muted-foreground">{pinyin}</p>
          </div>
          <Separator />
          <div>
            <h4 className="text-xs font-medium uppercase text-muted-foreground mb-1">Definition</h4>
            <p className="text-sm">{definition}</p>
          </div>
          {/* Add more sections here, e.g., "Examples", "Etymology" */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default CharacterAnalysisPopover;