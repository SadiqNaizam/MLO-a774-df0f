import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import TextCard from '@/components/TextCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

// Placeholder data for library texts
const initialLibraryTexts = [
  { id: 'poem-wang-wei-red-bean', title: '相思 (Red Bean Poem)', excerpt: '紅豆生南國，春來發幾枝。願君多采擷，此物最相思。', sourceLanguage: 'Classical Chinese', tags: ['Tang Dynasty', 'Poetry', 'Love', 'Wang Wei'] },
  { id: 'proverb-learning', title: '學如逆水行舟 (Learning Proverb)', excerpt: '學如逆水行舟，不進則退。', sourceLanguage: 'Chinese Proverb', tags: ['Proverb', 'Education', 'Diligence'] },
  { id: 'excerpt-dao-de-jing', title: '道德經 - Chapter 1 (Excerpt)', excerpt: '道可道，非常道。名可名，非常名。無名天地之始；有名萬物之母。', sourceLanguage: 'Classical Chinese', tags: ['Philosophy', 'Taoism', 'Laozi'] },
  { id: 'poem-li-bai-quiet-night', title: '靜夜思 (Quiet Night Thoughts)', excerpt: '床前明月光，疑是地上霜。舉頭望明月，低頭思故鄉。', sourceLanguage: 'Classical Chinese', tags: ['Tang Dynasty', 'Poetry', 'Nostalgia', 'Li Bai'] },
  { id: 'modern-greeting', title: 'Modern Greeting Example', excerpt: '你好！最近怎么样？希望你一切都好。', sourceLanguage: 'Modern Chinese', tags: ['Greeting', 'Conversation'] },
];

const ITEMS_PER_PAGE = 6;

const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTexts = initialLibraryTexts.filter(text =>
    text.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    text.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    text.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredTexts.length / ITEMS_PER_PAGE);
  const paginatedTexts = filteredTexts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewText = (id: string | number) => {
    console.log('View text analysis for:', id);
    // Navigate to TextAnalysisPage, potentially passing the text ID or content
    // For now, just navigating, TextAnalysisPage would need logic to load by ID
    navigate(`/analyze?textId=${id}`);
  };

  const handleSaveText = (id: string | number) => {
    console.log('Save text to user library:', id);
    // Add toast notification
    alert(`Text with ID ${id} saved (mock)!`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Text Library</h1>
          <p className="text-muted-foreground mb-6">Browse and explore pre-analyzed Chinese texts. Click on a text to view its detailed analysis.</p>
          <div className="flex gap-2 mb-6">
            <Input
              type="search"
              placeholder="Search texts by title, excerpt, or tag..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
              className="max-w-sm"
            />
            <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          </div>
        </section>

        {paginatedTexts.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-350px)] pr-2"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTexts.map(text => (
                <TextCard
                  key={text.id}
                  id={text.id}
                  title={text.title}
                  excerpt={text.excerpt}
                  sourceLanguage={text.sourceLanguage}
                  tags={text.tags}
                  onView={handleViewText}
                  onSave={handleSaveText} // Optional: implement save from library
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center text-muted-foreground py-10">No texts found matching your search criteria.</p>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} aria-disabled={currentPage === 1} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
               {/* Add Ellipsis logic if many pages */}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} aria-disabled={currentPage === totalPages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LibraryPage;