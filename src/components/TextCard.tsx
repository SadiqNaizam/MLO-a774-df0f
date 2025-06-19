import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Bookmark } from 'lucide-react'; // Example icons
// import { useToast } from "@/hooks/use-toast"; // If toast notifications are needed for actions

interface TextCardProps {
  id: string | number;
  title: string;
  excerpt?: string; // A short snippet or description
  sourceLanguage?: string;
  tags?: string[];
  onView: (id: string | number) => void;
  onSave?: (id: string | number) => void; // Optional save action
  className?: string;
}

const TextCard: React.FC<TextCardProps> = ({
  id,
  title,
  excerpt,
  sourceLanguage,
  tags,
  onView,
  onSave,
  className,
}) => {
  // const { toast } = useToast(); // Initialize toast if used
  console.log("Rendering TextCard for:", title);

  const handleSave = () => {
    if (onSave) {
      onSave(id);
      // Example: toast({ title: "Saved!", description: `"${title}" added to your library.` });
      console.log("Save action triggered for:", title);
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg mb-1">{title}</CardTitle>
            {sourceLanguage && <Badge variant="outline">{sourceLanguage}</Badge>}
        </div>
        {excerpt && <CardDescription className="line-clamp-2">{excerpt}</CardDescription>}
      </CardHeader>
      {tags && tags.length > 0 && (
        <CardContent className="py-2">
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2 pt-4">
        {onSave && (
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Bookmark className="mr-2 h-4 w-4" /> Save
          </Button>
        )}
        <Button variant="default" size="sm" onClick={() => onView(id)}>
          <ExternalLink className="mr-2 h-4 w-4" /> View Analysis
        </Button>
      </CardFooter>
    </Card>
  );
}
export default TextCard;