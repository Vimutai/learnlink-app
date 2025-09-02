import { Button } from "@/components/ui/button";
import { Rocket, PlayCircle } from "lucide-react";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Learn. Mentor.{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Empower.
                </span>{" "}
                
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                LearnLink connects students and mentors with curated digital and print resources. Every premium purchase supports underprivileged learners.              </p>
              <br />

              {/* Mission / Social Impact */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">Our Mission</h2>
                <p className="text-sm text-muted-foreground">
                  Our mission is to bridge educational gaps for underprivileged learners. 10% of every premium purchase goes to mentoring and digitally empowering learners in less privileged communities
                </p>
              </div>
              <br />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/library">
                <Button size="lg" className="text-lg px-8 py-4" data-testid="button-get-started">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link href="/accessibility">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" data-testid="button-explore-content">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Explore Content
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Accessible Learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm text-muted-foreground">Expert Mentors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Interactive Content</span>
              </div>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Students collaborating in modern classroom"
              className="rounded-xl shadow-2xl animate-pulse w-full"
              data-testid="img-hero"
            />

            <div className="absolute -bottom-6 -left-6 glass-card rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium" data-testid="text-active-learners">
                  500+ Active Learners
                </span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 glass-card rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-4 h-4 text-accent fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium" data-testid="text-rating">
                  4.9/5 Rating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
