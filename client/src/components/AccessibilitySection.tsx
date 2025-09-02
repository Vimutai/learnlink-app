import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Captions, Volume2, Maximize, Settings, Eye, Keyboard } from "lucide-react";
import { useState } from "react";

export function AccessibilitySection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleCaptions = () => setShowCaptions(!showCaptions);
  const toggleContrast = () => setHighContrast(!highContrast);

  return (
    <section
      className={`py-20 ${highContrast ? "bg-black text-white" : "bg-muted/30 text-muted-foreground"}`}
      aria-label="Accessibility Features Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Accessible Learning for Everyone
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Education should be accessible to all. LearnLink includes{" "}
            <strong>sign language videos, captions, audio descriptions, and universal access tools</strong> for an inclusive experience.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">Universal Access</h3>
              <p>
                Keyboard navigation, screen readers, high-contrast mode, and adjustable text size.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleContrast}
                aria-label="Toggle high contrast mode"
              >
                {highContrast ? "Normal Mode" : "High Contrast Mode"}
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Captions className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">Sign Language Videos</h3>
              <p>
                Professional ASL courses with captions and audio descriptions for hearing-impaired learners.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-8 space-y-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Keyboard className="w-8 h-8 text-secondary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold">Captions & Transcripts</h3>
              <p>
                All videos include accurate captions, transcripts, and optional keyboard shortcuts for media control.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Featured ASL Course */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-8 text-center">
              Featured: ASL Introduction Course
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Video Preview */}
              <div
                className="aspect-video bg-muted rounded-lg relative overflow-hidden"
                role="region"
                aria-label="ASL Video Preview"
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450"
                  alt="Sign language instructor teaching ASL"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-lg p-3 flex justify-between items-center text-white">
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" onClick={togglePlay} aria-label="Toggle play/pause">
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <span className="text-sm">02:34 / 15:42</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="ghost" size="sm" onClick={toggleCaptions} aria-label="Toggle captions" className={showCaptions ? "text-primary" : ""}>
                      <Captions className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Settings">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Volume control">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Fullscreen">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* ASL Course Info */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold">Basic Greetings in ASL</h4>
                <p>
                  Learn to sign “hello,” “how are you,” and “nice to meet you” with interactive exercises, badges, and progress tracking.
                </p>

                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span>Professional ASL instruction</span>
                  </li>
                  <li className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span>Interactive practice sessions</span>
                  </li>
                  <li className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span>Cultural context and tips</span>
                  </li>
                </ul>

                <Button className="w-full" size="lg" aria-label="Start ASL course">
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
