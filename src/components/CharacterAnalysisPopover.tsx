import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from '@/components/ui/separator';

interface WordDetailPopoverProps {
  term: string; // Changed from character
  pronunciation?: string; // Changed from pinyin, made optional
  definition: string;
  language?: 'chinese' | 'hindi' | 'telugu' | 'portuguese' | 'other';
  // Could add more details like etymology, example sentences etc.
  trigger: React.ReactNode; // The element that, when hovered/clicked, shows the popover
}

// Renaming export for clarity, though filename remains CharacterAnalysisPopover.tsx due to constraints
const WordDetailPopover: React.FC<WordDetailPopoverProps> = ({
  term,
  pronunciation,
  definition,
  language = 'other',
  trigger,
}) => {
  console.log(`Rendering WordDetailPopover for: ${term} (Lang: ${language})`);

  const termLabel = language === 'chinese' ? "Character" : "Term";
  const pronunciationLabel = language === 'chinese' ? "Pinyin" : "Pronunciation";

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-64 z-50"> {/* Ensure popover appears above other content */}
        <div className="space-y-2">
          <div className="text-center">
            <h3 className={`text-3xl font-semibold ${language === 'hindi' ? 'font-[Noto Sans Devanagari]' : language === 'telugu' ? 'font-[Noto Sans Telugu]' : 'font-sans' } text-primary`}>{term}</h3>
            {pronunciation && <p className="text-sm text-muted-foreground">{pronunciationLabel}: {pronunciation}</p>}
          </div>
          <Separator />
          <div>
            <h4 className="text-xs font-medium uppercase text-muted-foreground mb-1">Definition</h4>
            <p className="text-sm">{definition}</p>
          </div>
          {/* Add more sections here, e.g., "Examples", "Etymology" based on language */}
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default WordDetailPopover; // Keeping default export name same as filename
// Exporting with new name for clarity if imported elsewhere with this name.
export { WordDetailPopover as CharacterAnalysisPopover };