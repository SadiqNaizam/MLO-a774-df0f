import React from 'react';
import { cn } from '@/lib/utils';
// Assuming CharacterAnalysisPopover will be generalized or replaced
import WordDetailPopover from '@/components/CharacterAnalysisPopover'; 

export interface AnnotatedSegment {
  id: string | number;
  original: string; // Character or word
  pinyin?: string; // For Chinese or similar phonetic representation
  pronunciation?: string; // For other languages
  definition?: string;
  annotations?: string[];
  interactive?: boolean;
  language?: 'chinese' | 'hindi' | 'telugu' | 'portuguese' | 'other'; // Added language field
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
    <div className={cn("p-4 border rounded-md bg-card text-card-foreground flex flex-wrap items-start", className)} style={{ fontFamily: "var(--font-sans)"}}>
      {segments.map((segment, index) => (
        <span key={segment.id || index} className="inline-block m-1 leading-loose">
          {segment.interactive && segment.definition ? (
            <WordDetailPopover
              term={segment.original}
              pronunciation={segment.language === 'chinese' ? segment.pinyin : segment.pronunciation}
              definition={segment.definition!}
              language={segment.language}
              trigger={
                <span className="cursor-pointer hover:bg-primary/10 p-1 rounded transition-colors duration-150">
                  {segment.language === 'chinese' && segment.pinyin ? (
                    <ruby>
                      {segment.original}
                      <rt className="text-xs text-muted-foreground">{segment.pinyin}</rt>
                    </ruby>
                  ) : (
                    <span className="text-lg">{segment.original}</span> 
                  )}
                </span>
              }
            />
          ) : (
            <>
              {segment.language === 'chinese' && segment.pinyin ? (
                 <ruby>
                    {segment.original}
                    <rt className="text-xs text-muted-foreground">{segment.pinyin}</rt>
                 </ruby>
              ) : (
                // For non-interactive or non-Chinese segments without pinyin
                // Handle newline characters correctly
                segment.original === '\\n' ? <br /> : <span className="text-lg">{segment.original}</span>
              )}
            </>
          )}
          {/* Removed simple definition display here as it's handled by popover or non-interactive display */}
        </span>
      ))}
    </div>
  );
}
export default AnnotatedTextDisplay;