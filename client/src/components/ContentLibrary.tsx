import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Bookmark, Star, Crown, Lock } from "lucide-react";
import { Content } from "@shared/schema";

export function ContentLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [contentWithPremium, setContentWithPremium] = useState<Content[]>([]);

  // Fetch content
  const { data: content = [], isLoading } = useQuery<Content[]>({
    queryKey: ["/api/content"],
    queryFn: async () => {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error("Failed to fetch content");
      return res.json() as Promise<Content[]>;
    },
  });

  // Randomly assign premium status to some content items
  useEffect(() => {
    if (content.length > 0) {
      const updatedContent = content.map(item => ({
        ...item,
        // Randomly assign premium status (about 30% chance of being premium)
        isPremium: Math.random() < 0.3
      }));
      setContentWithPremium(updatedContent);
    }
  }, [content]);

  const categories = ["All", "Videos", "PDFs", "Interactive", "Sign Language"];

  // Filter content based on search and category
  const filteredContent = contentWithPremium.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (selectedCategory === "Videos" && item.contentType === "video") ||
      (selectedCategory === "PDFs" && item.contentType === "pdf") ||
      (selectedCategory === "Interactive" && item.contentType === "interactive") ||
      (selectedCategory === "Sign Language" && item.contentType === "sign_language");

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Learning Library</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Loading content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Learning Library</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover curated learning materials including interactive content, PDFs, videos, and accessible resources.
          </p>
        </div>

        {/* Search and Category Filter */}
        <div className="mb-12 space-y-4">
          <div className="relative max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="Search learning materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12"
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
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        {filteredContent.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No content found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className={`hover:shadow-xl transition-all duration-300 group overflow-hidden ${
                  item.isPremium ? "border-2 border-yellow-500" : ""
                }`}
              >
                {item.thumbnailUrl && (
                  <div className="relative">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-600 text-white p-1 rounded-full">
                        <Crown className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{item.contentType}</Badge>
                    {item.isPremium && (
                      <Badge className="bg-yellow-600 text-white flex items-center gap-1">
                        <Crown className="h-3 w-3" /> Premium
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {item.title}
                    {item.isPremium && <Lock className="h-4 w-4 inline-block ml-2 text-yellow-600" />}
                  </h3>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                    {item.isPremium && (
                      <span className="block mt-2 text-sm text-yellow-600 font-medium">
                        🔒 Premium content - upgrade to access
                      </span>
                    )}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Badge variant="outline">{item.difficulty}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-sm">{((item.rating || 0) / 10).toFixed(1)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            Load More Content
          </Button>
        </div>
      </div>
    </section>
  );
}