import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  MessageSquare,
  Heart,
  Share,
  Bookmark,
  Search,
  TrendingUp,
  Pin,
  Filter,
  User,
  Eye,
  ThumbsUp,
  CheckCircle,
  BookOpen,
  Download
} from "lucide-react";

const MOCK_DISCUSSIONS = [
  {
    id: "1",
    title: "How to improve math skills for primary students?",
    author: "Teacher Sarah",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    replies: 24,
    likes: 42,
    views: 156,
    tags: ["mathematics", "primary", "study-tips"],
    timestamp: "2 hours ago",
    pinned: true,
    content: "I've been teaching primary math for 5 years and found that interactive games work best for engagement. What methods have worked for other educators here?"
  },
  {
    id: "2",
    title: "Best science experiments for home learning",
    author: "Science Mentor",
    authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    replies: 18,
    likes: 37,
    views: 203,
    tags: ["science", "experiments", "home-learning"],
    timestamp: "5 hours ago",
    pinned: false,
    content: "Looking for safe and educational science experiments that can be done with common household items. Any suggestions?"
  },
  {
    id: "3",
    title: "English reading resources for beginners",
    author: "Reading Volunteer",
    authorAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db1604?w=150&h=150&fit=crop&crop=face",
    replies: 15,
    likes: 29,
    views: 178,
    tags: ["english", "reading", "beginners"],
    timestamp: "1 day ago",
    pinned: false,
    content: "I'm volunteering to teach English to beginners and would appreciate recommendations for free online reading resources."
  },
  {
    id: "4",
    title: "Career guidance for junior secondary students",
    author: "Career Counselor",
    authorAvatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face",
    replies: 32,
    likes: 51,
    views: 289,
    tags: ["career", "guidance", "junior-secondary"],
    timestamp: "2 days ago",
    pinned: true,
    content: "Many students struggle with career choices. What approaches have been successful in helping them explore options?"
  }
];

const MOCK_QUESTIONS = [
  {
    id: "q1",
    question: "How can I help my child with multiplication?",
    author: "Parent from Rural Area",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    answers: 8,
    resolved: true,
    timestamp: "3 hours ago"
  },
  {
    id: "q2",
    question: "What are good programming resources for kids?",
    author: "Community Volunteer",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    answers: 12,
    resolved: false,
    timestamp: "1 day ago"
  },
  {
    id: "q3", 
    question: "How to make learning fun for primary students?",
    author: "New Teacher",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    answers: 15,
    resolved: true,
    timestamp: "2 days ago"
  }
];

const MOCK_RESOURCES = [
  {
    id: "r1",
    title: "Free Math Worksheets for Grades 1-6",
    author: "Math Education Center",
    type: "worksheet",
    downloads: 1245,
    rating: 4.8,
    tags: ["math", "worksheets", "free"]
  },
  {
    id: "r2",
    title: "Science Experiment Video Series",
    author: "Science For Kids",
    type: "video",
    downloads: 876,
    rating: 4.6,
    tags: ["science", "experiments", "video"]
  },
  {
    id: "r3",
    title: "Reading Comprehension Guide",
    author: "Literacy Foundation",
    type: "guide",
    downloads: 1532,
    rating: 4.9,
    tags: ["reading", "comprehension", "guide"]
  }
];

export function CommunityForum() {
  const [activeTab, setActiveTab] = useState<"discussions" | "questions" | "resources">("discussions");
  const [newPost, setNewPost] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 mb-4">
            Community Learning Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with students, mentors, and parents. Share knowledge, ask questions, and grow together in our collaborative learning community.
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search discussions, questions, or resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeTab === "discussions" ? "default" : "outline"}
              onClick={() => setActiveTab("discussions")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Discussions
            </Button>
            <Button
              variant={activeTab === "questions" ? "default" : "outline"}
              onClick={() => setActiveTab("questions")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Q&A
            </Button>
            <Button
              variant={activeTab === "resources" ? "default" : "outline"}
              onClick={() => setActiveTab("resources")}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Button>
          </div>
        </div>

        {/* Create New Post */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Start a discussion</h3>
            <Textarea
              placeholder="What would you like to discuss or ask about?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px] mb-4"
            />
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer">mathematics</Badge>
                <Badge variant="secondary" className="cursor-pointer">primary</Badge>
                <Badge variant="outline" className="cursor-pointer">+ Add tag</Badge>
              </div>
              <Button disabled={!newPost.trim()} className="bg-blue-600 hover:bg-blue-700">
                Post Discussion
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content based on active tab */}
        {activeTab === "discussions" && (
          <div className="space-y-6">
            {MOCK_DISCUSSIONS.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                          <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{discussion.author}</p>
                          <p className="text-sm text-muted-foreground">{discussion.timestamp}</p>
                        </div>
                      </div>
                      {discussion.pinned && (
                        <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          <Pin className="h-3 w-3 mr-1" />
                          Pinned
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-xl mb-3">{discussion.title}</h3>
                    <p className="text-muted-foreground mb-4">{discussion.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {discussion.replies} replies
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes} likes
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {discussion.views} views
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 px-6 pb-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-6">
            {MOCK_QUESTIONS.map((question) => (
              <Card key={question.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{question.answers}</div>
                      <div className="text-sm text-muted-foreground">answers</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{question.question}</h3>
                        {question.resolved && (
                          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={question.authorAvatar} alt={question.author} />
                          <AvatarFallback>{question.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">Asked by {question.author} • {question.timestamp}</span>
                      </div>
                      
                      <Button className="bg-blue-600 hover:bg-blue-700">Answer Question</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_RESOURCES.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">By {resource.author}</p>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>⭐ {resource.rating}/5</span>
                    <span>📥 {resource.downloads} downloads</span>
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resource
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Community Stats */}
        <Card className="mt-12 shadow-md">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-6 text-center">Community Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,248</div>
                <div className="text-sm text-muted-foreground">Community Members</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">567</div>
                <div className="text-sm text-muted-foreground">Active Discussions</div>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">892</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">45</div>
                <div className="text-sm text-muted-foreground">Volunteer Mentors</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// REMOVE THIS DUPLICATE EXPORT - It should be in a separate page file
// export default function CommunityForumPage() {
//   return <CommunityForum />;
// }