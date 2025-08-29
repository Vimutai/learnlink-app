import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Captions, Volume2, Maximize, Settings } from "lucide-react";
import { useState } from "react";

export function AccessibilitySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleCaptions = () => setShowCaptions(!showCaptions);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Accessible Learning for Everyone</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe education should be accessible to all. Our platform includes comprehensive accessibility features
            and sign language content to ensure inclusive learning experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Universal Access</h3>
              <p className="text-muted-foreground">
                Screen reader compatible, keyboard navigation, and high contrast modes for users with different abilities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Sign Language Videos</h3>
              <p className="text-muted-foreground">
                Professional ASL interpretation for all video content, plus dedicated sign language learning courses.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Captions className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Captions & Transcripts</h3>
              <p className="text-muted-foreground">
                Accurate captions and full transcripts available for all audio and video content.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sign Language Video Player */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-8 text-center">Featured: ASL Introduction Course</h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                  alt="Sign language instructor teaching ASL"
                  className="w-full h-full object-cover"
                  data-testid="img-asl-video"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={togglePlay}
                    data-testid="button-play-video"
                  >
                    {isPlaying ? <Pause className="h-6 w-6 ml-0" /> : <Play className="h-6 w-6 ml-1" />}
                  </Button>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-lg p-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" onClick={togglePlay} data-testid="button-toggle-play">
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <span className="text-sm" data-testid="text-video-time">02:34 / 15:42</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleCaptions}
                        className={showCaptions ? "text-primary" : ""}
                        data-testid="button-toggle-captions"
                      >
                        <Captions className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid="button-adjust-speed">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid="button-volume">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" data-testid="button-fullscreen">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-semibold">Basic Greetings in ASL</h4>
                <p className="text-muted-foreground">
                  Learn fundamental greeting signs including "hello," "how are you," and "nice to meet you"
                  with clear demonstrations and practice exercises.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Professional ASL instruction</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Interactive practice sessions</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Cultural context and tips</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" data-testid="button-start-asl-course">
                  Start Learning ASL
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
