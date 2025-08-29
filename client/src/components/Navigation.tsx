import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { AuthModal } from "@/components/AuthModal";
import { Menu, X, GraduationCap, Users, Library, Accessibility, Code } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/library", label: "Library", icon: Library },
    { href: "/learn", label: "Learn", icon: Code },
    { href: "/mentors", label: "Mentors", icon: Users },
    { href: "/accessibility", label: "Accessibility", icon: Accessibility },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  LearnLink
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 font-medium transition-colors ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {userProfile?.displayName || user.email}
                  </span>
                  {userProfile?.role === "mentor" && (
                    <Link href="/upload">
                      <Button variant="outline" size="sm" data-testid="button-upload">
                        Upload Content
                      </Button>
                    </Link>
                  )}
                  <Link href="/messages">
                    <Button variant="outline" size="sm" data-testid="button-messages">
                      Messages
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleSignOut} data-testid="button-signout">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setAuthModalOpen(true)}
                    data-testid="button-signin"
                  >
                    Sign In
                  </Button>
                  <Button onClick={() => setAuthModalOpen(true)} data-testid="button-signup">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-4 py-3 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 py-2 font-medium transition-colors ${
                    location === item.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                {user ? (
                  <>
                    {userProfile?.role === "mentor" && (
                      <Link href="/upload" className="block">
                        <Button variant="outline" className="w-full" data-testid="button-mobile-upload">
                          Upload Content
                        </Button>
                      </Link>
                    )}
                    <Link href="/messages" className="block">
                      <Button variant="outline" className="w-full" data-testid="button-mobile-messages">
                        Messages
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={handleSignOut} data-testid="button-mobile-signout">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      data-testid="button-mobile-signin"
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      data-testid="button-mobile-signup"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
