import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle } from "lucide-react";
import { MentorProfile, User } from "@shared/schema";

type MentorWithUser = MentorProfile & {
  user: User;
};

export function MentorDirectory() {
  const { data: mentors = [], isLoading } = useQuery<MentorWithUser[]>({
    queryKey: ["/api/mentors"],
  });

  if (isLoading) {
    return (
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Your Mentors</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Loading mentors...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Meet Your Mentors</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with experienced professionals who are passionate about sharing their knowledge and helping you succeed.
          </p>
        </div>

        {mentors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No mentors available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-xl transition-all duration-300 group" data-testid={`card-mentor-${mentor.id}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="relative text-center">
                    <Avatar className="w-20 h-20 mx-auto ring-4 ring-primary/20">
                      <AvatarImage src={mentor.user.photoURL || undefined} alt={mentor.user.displayName || "Mentor"} />
                      <AvatarFallback data-testid={`avatar-mentor-${mentor.id}`}>
                        {mentor.user.displayName?.charAt(0) || mentor.user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {mentor.isAvailable && (
                      <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 w-4 h-4 bg-secondary rounded-full border-2 border-card"></div>
                    )}
                  </div>

                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold" data-testid={`name-mentor-${mentor.id}`}>
                      {mentor.user.displayName || mentor.user.email}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`title-mentor-${mentor.id}`}>
                      {mentor.title}
                    </p>
                    {mentor.company && (
                      <p className="text-sm text-muted-foreground" data-testid={`company-mentor-${mentor.id}`}>
                        at {mentor.company}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(mentor.expertise || []).slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" data-testid={`skill-mentor-${mentor.id}-${index}`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {mentor.user.bio && (
                      <p className="text-sm text-muted-foreground text-center line-clamp-3" data-testid={`bio-mentor-${mentor.id}`}>
                        {mentor.user.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-sm font-medium" data-testid={`rating-mentor-${mentor.id}`}>
                        {((mentor.rating || 0) / 10).toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground" data-testid={`reviews-mentor-${mentor.id}`}>
                        ({mentor.reviewCount})
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="group-hover:scale-105 transform transition-transform"
                      data-testid={`button-connect-${mentor.id}`}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" data-testid="button-view-all-mentors">
            View All Mentors
          </Button>
        </div>
      </div>
    </section>
  );
}
