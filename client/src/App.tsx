import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import LibraryPage from "@/pages/LibraryPage";
import MentorsPage from "@/pages/MentorsPage";
import AccessibilityPage from "@/pages/AccessibilityPage";
import UploadPage from "@/pages/UploadPage";
import MessagesPage from "@/pages/MessagesPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/library" component={LibraryPage} />
      <Route path="/mentors" component={MentorsPage} />
      <Route path="/accessibility" component={AccessibilityPage} />
      <Route path="/upload" component={UploadPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navigation />
              <main>
                <Router />
              </main>
              <footer className="bg-muted/50 border-t border-border py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          LearnLink
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Connecting learners with mentors through accessible, inclusive education.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Platform</h4>
                      <div className="space-y-2 text-sm">
                        <a href="/library" className="block text-muted-foreground hover:text-primary transition-colors">Browse Library</a>
                        <a href="/mentors" className="block text-muted-foreground hover:text-primary transition-colors">Find Mentors</a>
                        <a href="/upload" className="block text-muted-foreground hover:text-primary transition-colors">Upload Content</a>
                        <a href="/messages" className="block text-muted-foreground hover:text-primary transition-colors">Messages</a>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Accessibility</h4>
                      <div className="space-y-2 text-sm">
                        <a href="/accessibility" className="block text-muted-foreground hover:text-primary transition-colors">ASL Resources</a>
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Screen Reader Guide</a>
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Keyboard Navigation</a>
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Accessibility Statement</a>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Support</h4>
                      <div className="space-y-2 text-sm">
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Help Center</a>
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact Us</a>
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border mt-12 pt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      © 2024 LearnLink. All rights reserved. Built with accessibility and inclusion at heart.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
