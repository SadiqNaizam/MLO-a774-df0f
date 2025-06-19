import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import AnnotatedTextDisplay, { AnnotatedSegment } from '@/components/AnnotatedTextDisplay';
import TranslationComparisonView from '@/components/TranslationComparisonView';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner"; // Using sonner for toasts

const TextAnalysisPage: React.FC = () => {
  console.log('TextAnalysisPage loaded');
  const [inputText, setInputText] = useState<string>("紅豆生南國，春來發幾枝。\n願君多采擷，此物最相思。");
  const [analyzedSegments, setAnalyzedSegments] = useState<AnnotatedSegment[]>([]);
  const [literalTranslation, setLiteralTranslation] = useState<string>("");
  const [idiomaticTranslation, setIdiomaticTranslation] = useState<string>("");
  const [poeticNotes, setPoeticNotes] = useState<string>("");
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);

  const handleAnalyzeText = () => {
    // Mock analysis - replace with actual API call or logic
    console.log("Analyzing text:", inputText);
    if (!inputText.trim()) {
        toast.error("Please enter some text to analyze.");
        return;
    }

    // Example: Red Bean Poem (相思 - Wang Wei)
    if (inputText.includes("紅豆生南國")) {
        setAnalyzedSegments([
            { id: 1, original: "紅", pinyin: "hóng", definition: "red; bonus; popular", interactive: true },
            { id: 2, original: "豆", pinyin: "dòu", definition: "bean; pea", interactive: true },
            { id: 3, original: "生", pinyin: "shēng", definition: "to be born; to give birth; life; to grow", interactive: true },
            { id: 4, original: "南", pinyin: "nán", definition: "south", interactive: true },
            { id: 5, original: "國", pinyin: "guó", definition: "country; state; nation", interactive: true },
            { id: 6, original: "，", definition: "comma" },
            { id: 7, original: "春", pinyin: "chūn", definition: "spring (season); gay; joyful", interactive: true },
            { id: 8, original: "來", pinyin: "lái", definition: "to come; to arrive", interactive: true },
            { id: 9, original: "發", pinyin: "fā", definition: "to send out; to show (one's feeling); to issue", interactive: true },
            { id: 10, original: "幾", pinyin: "jǐ", definition: "how many; several; a few", interactive: true },
            { id: 11, original: "枝", pinyin: "zhī", definition: "branch; classifier for sticks, rods, pencils", interactive: true },
            { id: 12, original: "。", definition: "period" },
            { id: 13, original: "\n" },
            { id: 14, original: "願", pinyin: "yuàn", definition: "to hope; to wish; to desire", interactive: true },
            { id: 15, original: "君", pinyin: "jūn", definition: "monarch; lord; gentleman; you (polite)", interactive: true },
            { id: 16, original: "多", pinyin: "duō", definition: "many; much; a lot of", interactive: true },
            { id: 17, original: "采", pinyin: "cǎi", definition: "to pick; to gather; to pluck", interactive: true },
            { id: 18, original: "擷", pinyin: "xié", definition: "to pick; to collect", interactive: true },
            { id: 19, original: "，", definition: "comma" },
            { id: 20, original: "此", pinyin: "cǐ", definition: "this; these", interactive: true },
            { id: 21, original: "物", pinyin: "wù", definition: "thing; object; matter", interactive: true },
            { id: 22, original: "最", pinyin: "zuì", definition: "most; the most; -est", interactive: true },
            { id: 23, original: "相", pinyin: "xiāng", definition: "each other; one another; mutually", interactive: true },
            { id: 24, original: "思", pinyin: "sī", definition: "to think; to consider; to miss", interactive: true },
            { id: 25, original: "。", definition: "period" },
        ]);
        setLiteralTranslation("Red bean grow south country. Spring come open-up several branch. Wish you much pick-gather. This thing most miss-think.");
        setIdiomaticTranslation("Red beans grow in southern lands,\nWhen spring arrives, they shoot forth many branches.\nI hope you will gather them aplenty,\nFor these are the truest tokens of longing.");
        setPoeticNotes("This famous poem, 'Red Beans' (相思 - Xiāngsī) by Wang Wei (王維), is a classic expression of longing and love. The red bean (Ormosia hosiei) is often associated with lovesickness or deep affection in Chinese culture. The poem's simple language and vivid imagery evoke a sense of gentle yet profound emotion.");
    } else {
        // Generic placeholder for other text
        setAnalyzedSegments(
            inputText.split('').map((char, index) => ({
                id: index,
                original: char,
                pinyin: 'pīnyīn',
                definition: 'definition',
                interactive: char.trim() !== '' && !['，', '。', '！', '？'].includes(char)
            }))
        );
        setLiteralTranslation("Placeholder literal translation of the input text.");
        setIdiomaticTranslation("Placeholder idiomatic translation reflecting the essence of the text.");
        setPoeticNotes("Contextual notes and literary analysis for this text will appear here.");
    }
    setIsAnalyzed(true);
    toast.success("Text analysis complete!");
  };

  const handleSaveToLibrary = () => {
    // Mock save action
    if (!isAnalyzed) {
        toast.error("Please analyze the text before saving.");
        return;
    }
    console.log("Saving to library:", inputText);
    toast.success("Poem saved to your library!");
    // Add logic to save to user's account/local storage etc.
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Analyze Chinese Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your Chinese text here... e.g., 紅豆生南國..."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setIsAnalyzed(false); // Reset analysis state if text changes
              }}
              rows={6}
              className="mb-4 text-lg"
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAnalyzeText} className="w-full sm:w-auto">Analyze Text</Button>
                {isAnalyzed && (
                    <Button onClick={handleSaveToLibrary} variant="outline" className="w-full sm:w-auto">
                        Save to My Library
                    </Button>
                )}
            </div>
          </CardContent>
        </Card>

        {isAnalyzed && (
          <ScrollArea className="h-[calc(100vh-300px)] pr-4"> {/* Adjust height as needed */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3">Interactive Text Analysis</h2>
                <AnnotatedTextDisplay segments={analyzedSegments} />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Translation Comparison</h2>
                <TranslationComparisonView
                  literalTranslation={literalTranslation}
                  idiomaticTranslation={idiomaticTranslation}
                  sourceLanguage="Classical Chinese (Literal)"
                  targetLanguage="English (Idiomatic)"
                />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Context & Notes</h2>
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg">Poetic & Contextual Notes</AccordionTrigger>
                    <AccordionContent>
                      <div className="prose prose-sm max-w-none dark:prose-invert p-2">
                        {poeticNotes || "No specific notes available for this text yet."}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg">Grammar Points</AccordionTrigger>
                    <AccordionContent>
                      <p className="p-2">Detailed grammar explanations relevant to the text will appear here. (e.g., particle usage, sentence structures)</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </div>
          </ScrollArea>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TextAnalysisPage;