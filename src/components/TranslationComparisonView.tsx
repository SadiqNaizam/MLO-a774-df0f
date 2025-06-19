import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface TranslationComparisonViewProps {
  literalTranslation: string;
  idiomaticTranslation: string;
  notes?: string; // For author, context, interpretations
  sourceLanguage?: string; // e.g., "Classical Chinese"
  targetLanguage?: string; // e.g., "English"
}

const TranslationComparisonView: React.FC<TranslationComparisonViewProps> = ({
  literalTranslation,
  idiomaticTranslation,
  notes,
  sourceLanguage = "Literal",
  targetLanguage = "Idiomatic"
}) => {
  console.log("Rendering TranslationComparisonView");

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{sourceLanguage} Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{literalTranslation}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{targetLanguage} Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{idiomaticTranslation}</p>
          </CardContent>
        </Card>
      </div>

      {notes && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Poetic & Contextual Notes</AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                 {/* Using Tailwind Typography plugin for nice text formatting if available */}
                <p>{notes}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
export default TranslationComparisonView;