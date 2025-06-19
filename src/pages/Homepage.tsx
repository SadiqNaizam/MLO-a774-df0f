import React from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-950">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-24">
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
            Unlock the Depths of Chinese Texts with <span className="text-primary">LinguaLex</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
            LinguaLex is an advanced Chinese Text Analyzer designed to help you explore, understand, and appreciate the nuances of the Chinese language, from classical poems to modern articles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link to="/analyze">
                Analyze New Text <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link to="/library">
                Explore Text Library <BookOpen className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-16 md:mt-24 grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Character Insights</CardTitle>
              <CardDescription>Pinyin, definitions, and stroke order for every character.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Dive deep into individual characters to understand their core meanings and usage.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Translation Comparison</CardTitle>
              <CardDescription>See literal vs. idiomatic translations side-by-side.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Grasp the subtleties of language by comparing direct and contextual translations.</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>Contextual Annotations</CardTitle>
              <CardDescription>Explore grammatical notes, cultural context, and literary references.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Uncover the rich layers of meaning embedded within the text.</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;