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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";

type SupportedLanguage = 'chinese' | 'hindi' | 'telugu' | 'portuguese' | 'other';

const languageExamples: Record<SupportedLanguage, string> = {
    chinese: "紅豆生南國，春來發幾枝。\n願君多采擷，此物最相思。",
    hindi: "नमस्ते दुनियाँ", // Hello World
    telugu: "నమస్కారం ప్రపంచం", // Hello World
    portuguese: "Olá Mundo", // Hello World
    other: "Hello World"
};

const languageNames: Record<SupportedLanguage, string> = {
    chinese: "Chinese",
    hindi: "Hindi",
    telugu: "Telugu",
    portuguese: "Portuguese",
    other: "Other/English"
};


const TextAnalysisPage: React.FC = () => {
  console.log('TextAnalysisPage loaded');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('chinese');
  const [inputText, setInputText] = useState<string>(languageExamples.chinese);
  const [analyzedSegments, setAnalyzedSegments] = useState<AnnotatedSegment[]>([]);
  const [literalTranslation, setLiteralTranslation] = useState<string>("");
  const [idiomaticTranslation, setIdiomaticTranslation] = useState<string>("");
  const [poeticNotes, setPoeticNotes] = useState<string>("");
  const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);

  const handleLanguageChange = (value: string) => {
    const lang = value as SupportedLanguage;
    setSelectedLanguage(lang);
    setInputText(languageExamples[lang] || "");
    setIsAnalyzed(false);
    setAnalyzedSegments([]);
    setLiteralTranslation("");
    setIdiomaticTranslation("");
    setPoeticNotes("");
  };

  const handleAnalyzeText = () => {
    console.log(`Analyzing text for ${selectedLanguage}:`, inputText);
    if (!inputText.trim()) {
        toast.error("Please enter some text to analyze.");
        return;
    }

    let segments: AnnotatedSegment[] = [];
    let litTrans = "";
    let idioTrans = "";
    let notes = "";

    switch (selectedLanguage) {
        case 'chinese':
            // Example: Red Bean Poem (相思 - Wang Wei)
            if (inputText.includes("紅豆生南國")) {
                segments = [
                    { id: 1, original: "紅", pinyin: "hóng", definition: "red; bonus; popular", interactive: true, language: 'chinese' },
                    { id: 2, original: "豆", pinyin: "dòu", definition: "bean; pea", interactive: true, language: 'chinese' },
                    { id: 3, original: "生", pinyin: "shēng", definition: "to be born; to give birth; life; to grow", interactive: true, language: 'chinese' },
                    { id: 4, original: "南", pinyin: "nán", definition: "south", interactive: true, language: 'chinese' },
                    { id: 5, original: "國", pinyin: "guó", definition: "country; state; nation", interactive: true, language: 'chinese' },
                    { id: 6, original: "，", definition: "comma", language: 'chinese' },
                    { id: 7, original: "春", pinyin: "chūn", definition: "spring (season); gay; joyful", interactive: true, language: 'chinese' },
                    { id: 8, original: "來", pinyin: "lái", definition: "to come; to arrive", interactive: true, language: 'chinese' },
                    { id: 9, original: "發", pinyin: "fā", definition: "to send out; to show (one's feeling); to issue", interactive: true, language: 'chinese' },
                    { id: 10, original: "幾", pinyin: "jǐ", definition: "how many; several; a few", interactive: true, language: 'chinese' },
                    { id: 11, original: "枝", pinyin: "zhī", definition: "branch; classifier for sticks, rods, pencils", interactive: true, language: 'chinese' },
                    { id: 12, original: "。", definition: "period", language: 'chinese' },
                    { id: 13, original: "\\n", language: 'chinese' }, // Represent newline
                    { id: 14, original: "願", pinyin: "yuàn", definition: "to hope; to wish; to desire", interactive: true, language: 'chinese' },
                    { id: 15, original: "君", pinyin: "jūn", definition: "monarch; lord; gentleman; you (polite)", interactive: true, language: 'chinese' },
                    { id: 16, original: "多", pinyin: "duō", definition: "many; much; a lot of", interactive: true, language: 'chinese' },
                    { id: 17, original: "采", pinyin: "cǎi", definition: "to pick; to gather; to pluck", interactive: true, language: 'chinese' },
                    { id: 18, original: "擷", pinyin: "xié", definition: "to pick; to collect", interactive: true, language: 'chinese' },
                    { id: 19, original: "，", definition: "comma", language: 'chinese' },
                    { id: 20, original: "此", pinyin: "cǐ", definition: "this; these", interactive: true, language: 'chinese' },
                    { id: 21, original: "物", pinyin: "wù", definition: "thing; object; matter", interactive: true, language: 'chinese' },
                    { id: 22, original: "最", pinyin: "zuì", definition: "most; the most; -est", interactive: true, language: 'chinese' },
                    { id: 23, original: "相", pinyin: "xiāng", definition: "each other; one another; mutually", interactive: true, language: 'chinese' },
                    { id: 24, original: "思", pinyin: "sī", definition: "to think; to consider; to miss", interactive: true, language: 'chinese' },
                    { id: 25, original: "。", definition: "period", language: 'chinese' },
                ];
                litTrans = "Red bean grow south country. Spring come open-up several branch. Wish you much pick-gather. This thing most miss-think.";
                idioTrans = "Red beans grow in southern lands,\nWhen spring arrives, they shoot forth many branches.\nI hope you will gather them aplenty,\nFor these are the truest tokens of longing.";
                notes = "This famous poem, 'Red Beans' (相思 - Xiāngsī) by Wang Wei (王維), is a classic expression of longing and love. The red bean (Ormosia hosiei) is often associated with lovesickness or deep affection in Chinese culture.";
            } else {
                 // Generic placeholder for other Chinese text
                segments = inputText.split('').map((char, index) => ({
                    id: index, original: char, pinyin: 'pīnyīn', definition: 'definition', interactive: char.trim() !== '' && !['，', '。', '！', '？'].includes(char), language: 'chinese'
                }));
                litTrans = "Placeholder literal Chinese translation.";
                idioTrans = "Placeholder idiomatic Chinese translation.";
                notes = "Contextual notes for this Chinese text.";
            }
            break;
        case 'hindi':
            segments = [
                { id: 1, original: "नमस्ते", pronunciation: "na-mas-te", definition: "Hello / Greetings", interactive: true, language: 'hindi' },
                { id: 2, original: " ", language: 'hindi' },
                { id: 3, original: "दुनियाँ", pronunciation: "du-ni-yaan", definition: "World", interactive: true, language: 'hindi' }
            ];
            litTrans = "Greetings World";
            idioTrans = "Hello World";
            notes = "A common Hindi greeting.";
            break;
        case 'telugu':
            segments = [
                { id: 1, original: "నమస్కారం", pronunciation: "na-mas-kaa-ram", definition: "Hello / Greetings", interactive: true, language: 'telugu' },
                { id: 2, original: " ", language: 'telugu' },
                { id: 3, original: "ప్రపంచం", pronunciation: "pra-pan-cham", definition: "World", interactive: true, language: 'telugu' }
            ];
            litTrans = "Greetings World";
            idioTrans = "Hello World";
            notes = "A common Telugu greeting.";
            break;
        case 'portuguese':
            segments = [
                { id: 1, original: "Olá", pronunciation: "o-LA", definition: "Hello", interactive: true, language: 'portuguese' },
                { id: 2, original: " ", language: 'portuguese' },
                { id: 3, original: "Mundo", pronunciation: "MOON-do", definition: "World", interactive: true, language: 'portuguese' }
            ];
            litTrans = "Hello World";
            idioTrans = "Hello World";
            notes = "A common Portuguese greeting.";
            break;
        default: // 'other' or fallback
            segments = inputText.split(/(\s+)/).filter(Boolean).map((word, index) => ({ // Split by space to get words
                id: index, original: word, definition: 'definition', interactive: word.trim() !== '', language: 'other'
            }));
            litTrans = "Placeholder literal translation.";
            idioTrans = "Placeholder idiomatic translation.";
            notes = "Contextual notes for this text.";
    }

    setAnalyzedSegments(segments.map(s => s.original === '\\n' ? { ...s, original: '\n' } : s));
    setLiteralTranslation(litTrans);
    setIdiomaticTranslation(idioTrans);
    setPoeticNotes(notes);
    setIsAnalyzed(true);
    toast.success(`Text analysis complete for ${languageNames[selectedLanguage]}!`);
  };

  const handleSaveToLibrary = () => {
    if (!isAnalyzed) {
        toast.error("Please analyze the text before saving.");
        return;
    }
    console.log("Saving to library:", inputText, "Language:", selectedLanguage);
    toast.success(`Text (${languageNames[selectedLanguage]}) saved to your library!`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Analyze Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
                <Label htmlFor="language-select" className="mb-2 block">Select Language:</Label>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language-select" className="w-full sm:w-[280px]">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="chinese">Chinese (中文)</SelectItem>
                        <SelectItem value="hindi">Hindi (हिन्दी)</SelectItem>
                        <SelectItem value="telugu">Telugu (తెలుగు)</SelectItem>
                        <SelectItem value="portuguese">Portuguese (Português)</SelectItem>
                        <SelectItem value="other">Other/English</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Textarea
              placeholder={`Paste your ${languageNames[selectedLanguage]} text here... e.g., ${languageExamples[selectedLanguage].split('\n')[0]}`}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setIsAnalyzed(false); 
              }}
              rows={6}
              className="mb-4 text-lg"
              style={{ 
                fontFamily: selectedLanguage === 'hindi' ? '"Noto Sans Devanagari", var(--font-sans)' : 
                            selectedLanguage === 'telugu' ? '"Noto Sans Telugu", var(--font-sans)' : 
                            'var(--font-sans)' 
              }}
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
          <ScrollArea className="h-[calc(100vh-350px)] pr-4"> {/* Adjust height as needed */}
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
                  sourceLanguage={`${languageNames[selectedLanguage]} (Literal)`}
                  targetLanguage="English (Idiomatic)"
                />
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Context & Notes</h2>
                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg">Contextual Notes</AccordionTrigger>
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