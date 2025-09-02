import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { BookOpen, Target, Award, Clock, TrendingUp, Calendar } from "lucide-react";

const MOCK_PROGRESS = {
  completedCourses: 12,
  totalHours: 45,
  currentStreak: 7,
  badges: 8,
  weeklyGoal: 5, // hours per week
  currentWeekHours: 3.5
};

const MOCK_RECENT_ACTIVITY = [
  { course: "Basic Mathematics", progress: 85, date: "2 hours ago" },
  { course: "English Reading", progress: 60, date: "1 day ago" },
  { course: "Science Experiments", progress: 45, date: "2 days ago" },
  { course: "Programming Basics", progress: 30, date: "3 days ago" }
];

const MOCK_BADGES = [
  { name: "Math Whiz", earned: true, description: "Complete 10 math lessons" },
  { name: "Bookworm", earned: true, description: "Read 20 chapters" },
  { name: "Science Explorer", earned: true, description: "Complete 5 experiments" },
  { name: "Coding Champion", earned: false, description: "Write first program" },
  { name: "Consistent Learner", earned: true, description: "7-day streak" }
];

export function StudentDashboard() {
  const progressPercentage = (MOCK_PROGRESS.currentWeekHours / MOCK_PROGRESS.weeklyGoal) * 100;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 mb-4">
          My Learning Journey
        </h1>
        <p className="text-lg text-muted-foreground">
          Track your progress, celebrate achievements, and keep learning!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{MOCK_PROGRESS.completedCourses}</div>
            <div className="text-sm text-muted-foreground">Courses Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{MOCK_PROGRESS.totalHours}h</div>
            <div className="text-sm text-muted-foreground">Total Learning</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{MOCK_PROGRESS.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{MOCK_PROGRESS.badges}</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Weekly Learning Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {MOCK_PROGRESS.currentWeekHours}h of {MOCK_PROGRESS.weeklyGoal}h
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <Button>Set New Goal</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_RECENT_ACTIVITY.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{activity.course}</div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{activity.progress}%</div>
                  <Progress value={activity.progress} className="h-2 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badges Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            My Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MOCK_BADGES.map((badge, index) => (
              <Card key={index} className={`text-center p-4 ${!badge.earned && "opacity-50"}`}>
                <Award className={`h-8 w-8 mx-auto mb-2 ${badge.earned ? "text-amber-500" : "text-muted-foreground"}`} />
                <div className="font-medium text-sm mb-1">{badge.name}</div>
                <div className="text-xs text-muted-foreground">{badge.description}</div>
                {badge.earned && (
                    <Badge variant="default" className="mt-2 bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900 dark:text-green-300">
                        Earned
                    </Badge>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Calendar */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Learning Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Connect your calendar to schedule learning sessions with mentors</p>
            <Button className="mt-4">Connect Calendar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Add this default export to fix the error
export default StudentDashboard;