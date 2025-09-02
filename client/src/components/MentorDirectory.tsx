import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Label } from "../components/ui/label";
import {
  Crown,
  Users,
  BookOpen,
  Video,
  MessageSquare,
  Award,
  Heart,
  Star,
  Shield,
  Clock,
  Calendar,
  Target,
  GraduationCap,
  Sparkles,
  BookText,
  Brain,
  Lightbulb,
  Zap,
  Bookmark,
  Mail,
  MapPin,
  Briefcase,
  Languages,
  Globe
} from "lucide-react";

// Define proper TypeScript interfaces
interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  expertise: string[];
  rating: number;
  reviews: number;
  avatar: string;
  isPremium: boolean;
  available: boolean;
  responseTime: string;
  languages: string[];
}

interface MentorshipTier {
  id: string;
  title: string;
  description: string;
  price: number | { monthly: number; yearly: number };
  features: string[];
  limitations?: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

interface ScholarshipOption {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  coverage: string;
}

export default function MentorsPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [selectedTier, setSelectedTier] = useState("free");
  const [activeTab, setActiveTab] = useState("mentors");

  // Sample mentor data
  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      expertise: ["React", "TypeScript", "CSS", "Next.js"],
      rating: 4.8,
      reviews: 42,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      isPremium: true,
      available: true,
      responseTime: "< 4 hours",
      languages: ["English", "Spanish"]
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Full Stack Engineer",
      company: "StartUp Ventures",
      expertise: ["Node.js", "PostgreSQL", "AWS", "GraphQL"],
      rating: 4.7,
      reviews: 29,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isPremium: false,
      available: true,
      responseTime: "< 8 hours",
      languages: ["English", "Mandarin"]
    },
    {
      id: "3",
      name: "Priya Patel",
      role: "Data Science Mentor",
      company: "Data Insights Co.",
      expertise: ["Python", "Machine Learning", "Data Visualization", "SQL"],
      rating: 4.6,
      reviews: 31,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      isPremium: true,
      available: false,
      responseTime: "< 24 hours",
      languages: ["English", "Hindi"]
    },
    {
      id: "4",
      name: "David Wilson",
      role: "UX/UI Designer",
      company: "Creative Studio",
      expertise: ["Figma", "User Research", "Prototyping", "Design Systems"],
      rating: 4.9,
      reviews: 37,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isPremium: false,
      available: true,
      responseTime: "< 6 hours",
      languages: ["English", "French"]
    }
  ];

  const mentorshipTiers: MentorshipTier[] = [
    {
      id: "free",
      title: "Free Access",
      description: "Basic learning resources for everyone",
      price: 0,
      features: [
        "Access to community forums",
        "Basic learning materials",
        "Weekly group Q&A sessions",
        "Standard progress tracking",
        "Peer-to-peer support"
      ],
      limitations: [
        "No 1-on-1 mentor access",
        "Limited advanced resources",
        "Standard response time (48h+)",
        "No personalized learning plans"
      ],
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      color: "border-blue-200 bg-blue-50"
    },
    {
      id: "premium",
      title: "Premium Mentorship",
      description: "1-on-1 guidance and personalized learning",
      price: { monthly: 49, yearly: 490 },
      features: [
        "Weekly 1:1 video sessions with mentors",
        "Unlimited messaging with priority response",
        "Personalized learning plan & roadmap",
        "Advanced learning resources & projects",
        "Career guidance & portfolio reviews",
        "Certificate of completion"
      ],
      icon: <Crown className="h-6 w-6 text-amber-500" />,
      color: "border-amber-200 bg-amber-50",
      popular: true
    },
    {
      id: "elite",
      title: "Elite Program",
      description: "Comprehensive mentorship for ambitious learners",
      price: { monthly: 99, yearly: 990 },
      features: [
        "All Premium features plus:",
        "Daily 1:1 sessions available",
        "Dedicated mentor with industry expertise",
        "Project collaboration & code reviews",
        "Job interview preparation",
        "Industry networking opportunities",
        "Exclusive workshops & events"
      ],
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      color: "border-purple-200 bg-purple-50"
    }
  ];

  const scholarshipOptions: ScholarshipOption[] = [
    {
      id: "underprivileged",
      title: "Underprivileged Youth Scholarship",
      description: "For kids from low-income families",
      eligibility: "Household income below $30,000/year",
      coverage: "Full Premium access at no cost"
    },
    {
      id: "academic",
      title: "Academic Excellence Scholarship",
      description: "For students with outstanding academic records",
      eligibility: "GPA of 3.5 or higher",
      coverage: "50% discount on Premium tier"
    },
    {
      id: "community",
      title: "Community Contributor",
      description: "For those who actively help others learn",
      eligibility: "50+ helpful forum responses",
      coverage: "Free Premium access for 6 months"
    }
  ];

  const currentTier = mentorshipTiers.find(tier => tier.id === selectedTier) || mentorshipTiers[0];
  const isPremium = selectedTier !== "free";
  
  // Calculate yearly savings safely
  const yearlySavings = isPremium && typeof currentTier.price !== 'number' 
    ? currentTier.price.monthly * 12 - currentTier.price.yearly 
    : 0;

  // Helper function to get price display text
  const getPriceText = (tier: MentorshipTier) => {
    if (typeof tier.price === 'number') {
      return "Free";
    } else {
      const price = selectedPlan === "monthly" ? tier.price.monthly : tier.price.yearly;
      return `$${price}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LearnLink <span className="text-blue-600">Mentorship Program</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with expert mentors to accelerate your learning journey. Free resources for all, 
            premium 1-on-1 guidance for those who can support our mission.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="programs">Program Tiers</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mentors">
            {/* Mentors Grid */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Available Mentors</h2>
                <div className="flex gap-2">
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Sort</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map((mentor) => (
                  <Card key={mentor.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center">
                          <img
                            src={mentor.avatar}
                            alt={mentor.name}
                            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                          />
                          <h3 className="font-bold text-lg text-center">{mentor.name}</h3>
                          <p className="text-sm text-gray-600 text-center">{mentor.role}</p>
                          
                          {mentor.isPremium && (
                            <Badge className="mt-3 bg-amber-100 text-amber-800 hover:bg-amber-100">
                              <Crown className="h-3 w-3 mr-1" />
                              Premium Mentor
                            </Badge>
                          )}
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{mentor.company}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Response: {mentor.responseTime}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 fill-current" />
                              <span className="ml-1 font-semibold">{mentor.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({mentor.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Expertise:</h4>
                            <div className="flex flex-wrap gap-2">
                              {mentor.expertise.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Languages:</h4>
                            <div className="flex flex-wrap gap-2">
                              {mentor.languages.map((language, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <Languages className="h-3 w-3 mr-1" />
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-6">
                            <Button className="flex-1" disabled={!mentor.available}>
                              {mentor.available ? "Message Mentor" : "Not Available"}
                            </Button>
                            {mentor.isPremium && (
                              <Button variant="outline" className="gap-1">
                                <Crown className="h-4 w-4" />
                                Upgrade
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Free vs Premium Comparison */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Unlock Premium Mentorship
                </CardTitle>
                <CardDescription>
                  Get personalized 1-on-1 guidance from our expert mentors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-700">Free Access Includes:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Community forum access</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Basic learning resources</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>Group Q&A sessions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-amber-700">Premium Adds:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <Crown className="h-3 w-3 text-amber-600" />
                        </div>
                        <span>1-on-1 video sessions with mentors</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <Crown className="h-3 w-3 text-amber-600" />
                        </div>
                        <span>Unlimited messaging & priority response</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center">
                          <Crown className="h-3 w-3 text-amber-600" />
                        </div>
                        <span>Personalized learning plans</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => setActiveTab("programs")}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Explore Premium Plans
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="programs">
            {/* Program Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {mentorshipTiers.map((tier) => (
                <Card 
                  key={tier.id} 
                  className={`relative overflow-hidden transition-all hover:scale-105 ${tier.color} ${tier.popular ? 'ring-2 ring-amber-300' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      {tier.icon}
                      <CardTitle>{tier.title}</CardTitle>
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-3xl font-bold mb-4">{getPriceText(tier)}</div>
                    
                    {isPremium && typeof tier.price !== 'number' && selectedPlan === "yearly" && (
                      <div className="text-sm text-green-600 mt-1">Save ${yearlySavings} yearly</div>
                    )}
                    
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-4 w-4 rounded border flex items-center justify-center mt-1 bg-blue-50 border-blue-200">
                            <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {tier.limitations && tier.limitations.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Limitations:</h4>
                        <ul className="space-y-2">
                          {tier.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500">✕</span>
                              <span className="text-sm text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      {tier.id === "free" ? "Continue with Free" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Billing Toggle for paid plans */}
            {isPremium && (
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-lg">
                  <Button
                    variant={selectedPlan === "monthly" ? "default" : "ghost"}
                    onClick={() => setSelectedPlan("monthly")}
                    className="px-6"
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={selectedPlan === "yearly" ? "default" : "ghost"}
                    onClick={() => setSelectedPlan("yearly")}
                    className="px-6"
                  >
                    Yearly
                  </Button>
                </div>
              </div>
            )}

            {/* Selected Plan Summary */}
            {isPremium && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Your Selected Plan</CardTitle>
                  <CardDescription>
                    Review your selection before proceeding to payment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="font-semibold">{currentTier.title}</h3>
                      <p className="text-sm text-gray-500">{currentTier.description}</p>
                    </div>
                    <div className="text-right">
                      {typeof currentTier.price !== 'number' && (
                        <>
                          <p className="font-bold">${selectedPlan === "monthly" ? currentTier.price.monthly : currentTier.price.yearly}</p>
                          <p className="text-sm text-gray-500">per {selectedPlan === "monthly" ? "month" : "year"}</p>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Your Support Helps Others</h4>
                        <p className="text-sm text-blue-600 mt-1">
                          By subscribing to our premium plan, you're helping us provide free 
                          resources and scholarships to underprivileged kids who can't afford mentorship.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Your subscription will automatically renew until canceled. You can cancel anytime.
                  </p>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="scholarships">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Scholarship Programs</h2>
                <p className="text-gray-600">
                  We believe financial circumstances shouldn't limit access to quality education. 
                  Apply for one of our scholarship programs if you need assistance.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                {scholarshipOptions.map((scholarship) => (
                  <Card key={scholarship.id} className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{scholarship.title}</h3>
                          <p className="text-gray-700 mb-2">{scholarship.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <Target className="h-4 w-4" />
                            <span>Eligibility: {scholarship.eligibility}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Award className="h-4 w-4" />
                            <span>{scholarship.coverage}</span>
                          </div>
                        </div>
                        <Button variant="outline">Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Sponsor a Child's Education
                  </CardTitle>
                  <CardDescription>
                    Help us provide mentorship to underprivileged kids by contributing to our scholarship fund
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    For every $50 donated, we can provide one month of premium mentorship to a child 
                    who otherwise couldn't afford it.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <Button variant="outline">$50 - 1 Month</Button>
                    <Button variant="outline">$250 - 6 Months</Button>
                    <Button>$500 - Full Year</Button>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 mt-2">
                    $8,250 raised of $15,000 goal - 55 children sponsored so far
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export const MentorDirectory = () => { // Named export
  return (
    <div>
      <h1>Mentor Directory</h1>
      <p>This is the mentor directory component.</p>
    </div>
  );
};