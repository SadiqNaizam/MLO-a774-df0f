import React from 'react';
import { cn } from '@/lib/utils';
import { CharacterAnalysisPopover } from '@/components/CharacterAnalysisPopover'; // Assuming this will be created

export interface AnnotatedSegment {
  id: string | number;
  original: string;
  pinyin?: string;
  definition?: string;
  annotations?: string[]; // For other notes or grammatical info
  interactive?: boolean; // If true, will wrap in CharacterAnalysisPopover
}

interface AnnotatedTextDisplayProps {
  segments: AnnotatedSegment[];
  className?: string;
}

const AnnotatedTextDisplay: React.FC<AnnotatedTextDisplayProps> = ({ segments, className }) => {
  console.log("Rendering AnnotatedTextDisplay with segments:", segments.length);

  if (!segments || segments.length === 0) {
    return <p className="text-muted-foreground">No text to display.</p>;
  }

  return (
    <div className={cn("p-4 border rounded-md bg-card text-card-foreground", className)}>
      {segments.map((segment, index) => (
        <span key={segment.id || index} className="inline-block m-1 leading-loose">
          {segment.interactive && segment.pinyin && segment.definition ? (
            <CharacterAnalysisPopover
              character={segment.original}
              pinyin={segment.pinyin}
              definition={segment.definition}
              trigger={
                <span className="cursor-pointer hover:bg-primary/10 p-1 rounded transition-colors duration-150">
                  <ruby>
                    {segment.original}
                    {segment.pinyin && <rt className="text-xs text-muted-foreground">{segment.pinyin}</rt>}
                  </ruby>
                </span>
              }
            />
          ) : (
             <ruby>
                {segment.original}
                {segment.pinyin && <rt className="text-xs text-muted-foreground">{segment.pinyin}</rt>}
             </ruby>
          )}
          {/* Optionally display simple definition below or on hover if not interactive */}
          {/* {segment.definition && !segment.interactive && (
            <span className="block text-xs text-muted-foreground">{segment.definition}</span>
          )} */}
        </span>
      ))}
    </div>
  );
}
export default AnnotatedTextDisplay;