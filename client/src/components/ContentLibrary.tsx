import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Bookmark, Star } from "lucide-react";
import { Content } from "@shared/schema";

export function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: content = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"],
  });

  const categories = ["All", "Videos", "PDFs", "Interactive", "Sign Language"];

  const filteredContent = content.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           (selectedCategory === "Videos" && item.contentType === "video") ||
                           (selectedCategory === "PDFs" && item.contentType === "pdf") ||
                           (selectedCategory === "Interactive" && item.contentType === "interactive") ||
                           (selectedCategory === "Sign Language" && item.contentType === "sign_language");
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Learning Library</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading content...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Learning Library</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover curated learning materials including interactive content, PDFs, videos, and accessible resources
            designed for all learning styles.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-4">
          <div className="relative max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="Search learning materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
              data-testid="input-search"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No content found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <Card key={item.id} className="hover:shadow-xl transition-all duration-300 group overflow-hidden" data-testid={`card-content-${item.id}`}>
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    data-testid={`img-content-${item.id}`}
                  />
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" data-testid={`badge-type-${item.id}`}>
                      {item.contentType}
                    </Badge>
                    <Button variant="ghost" size="sm" data-testid={`button-bookmark-${item.id}`}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors" data-testid={`title-content-${item.id}`}>
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid={`description-content-${item.id}`}>
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Badge variant="outline" data-testid={`badge-difficulty-${item.id}`}>
                      {item.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-sm" data-testid={`rating-content-${item.id}`}>
                        {((item.rating || 0) / 10).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" data-testid="button-load-more">
            Load More Content
          </Button>
        </div>
      </div>
    </section>
  );
}
