import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FloatingShapes from "./FloatingShapes";
import SkillBubbles from "./SkillBubbles";
import { sampleSkills } from "@/data/skills";
import AnimatedCodeSnippet, { javaSpringBootCode, reactHookCode } from "./AnimatedCodeSnippet";
import { AnimatedProgressBar, CircularProgress, SkillMeter, AchievementCard, technicalSkills, achievements } from "./AnimatedProgress";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Target, TrendingUp } from "lucide-react";

const DynamicElementsShowcase = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Shapes Background */}
      <FloatingShapes shapeCount={15} interactive={true} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Dynamic Visual Elements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive components that bring your portfolio to life with physics-based animations,
            skill visualizations, and engaging code presentations.
          </p>
        </div>

        {/* Floating Shapes Demo */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-500" />
              Floating Geometric Shapes
            </CardTitle>
            <CardDescription>
              Physics-based interactive shapes that respond to cursor movement with realistic physics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 rounded-lg overflow-hidden">
              <FloatingShapes shapeCount={8} interactive={true} className="relative" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                  Move your cursor around to see the magic ✨
                </Badge>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Features:</strong> Mouse interaction, boundary collision, physics simulation, multiple shapes</p>
            </div>
          </CardContent>
        </Card>

        {/* Skill Bubbles Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-500" />
              Interactive Skill Bubbles
            </CardTitle>
            <CardDescription>
              Hover-responsive skill bubbles with scaling, color changes, and detailed tooltips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SkillBubbles skills={sampleSkills} className="min-h-[300px]" />
            <div className="mt-4 text-sm text-muted-foreground">
              <p><strong>Features:</strong> Hover effects, skill level rings, category colors, detailed tooltips</p>
            </div>
          </CardContent>
        </Card>

        {/* Animated Code Snippets */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Animated Code Snippets</h2>
            <p className="text-muted-foreground">
              Show your actual code with syntax highlighting and typewriter animations
            </p>
          </div>

          <div className="grid gap-8">
            <AnimatedCodeSnippet
              title="Payment Processing Service"
              language="Java"
              code={javaSpringBootCode}
              description="Spring Boot REST controller with authentication and error handling"
              autoPlay={true}
              playSpeed={80}
              theme="dark"
            />

            <AnimatedCodeSnippet
              title="Custom React Hook"
              language="TypeScript"
              code={reactHookCode}
              description="Reusable payment processing hook with loading states"
              autoPlay={false}
              theme="dark"
            />
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">Animated Progress Indicators</h2>
            <p className="text-muted-foreground">
              Multiple types of progress visualizations with smooth animations
            </p>
          </div>

          {/* Linear Progress Bars */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Skills</CardTitle>
              <CardDescription>Animated progress bars with staggered reveals</CardDescription>
            </CardHeader>
            <CardContent>
              <SkillMeter skills={technicalSkills} />
            </CardContent>
          </Card>

          {/* Circular Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Proficiency Levels</CardTitle>
              <CardDescription>Circular progress indicators with custom content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                <CircularProgress
                  label="Java Expertise"
                  value={95}
                  color="#F89820"
                  icon={<Code className="h-6 w-6" />}
                />
                <CircularProgress
                  label="Problem Solving"
                  value={92}
                  color="#10B981"
                  icon={<Target className="h-6 w-6" />}
                />
                <CircularProgress
                  label="System Design"
                  value={88}
                  color="#8B5CF6"
                  icon={<TrendingUp className="h-6 w-6" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievement Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Tracking</CardTitle>
              <CardDescription>Progress cards with animated counters and completion tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementCard
                    key={index}
                    {...achievement}
                    animationDelay={index * 0.3}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Examples</CardTitle>
            <CardDescription>
              Code snippets showing how to use these components in your projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Floating Shapes Background:</h4>
              <code className="block bg-muted p-3 rounded text-sm">
                {`<FloatingShapes shapeCount={12} interactive={true} />`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Interactive Skills Display:</h4>
              <code className="block bg-muted p-3 rounded text-sm">
                {`<SkillBubbles
  skills={skillsData}
  className="min-h-[400px]"
  interactive={true}
/>`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Animated Code Presentation:</h4>
              <code className="block bg-muted p-3 rounded text-sm">
                {`<AnimatedCodeSnippet
  title="API Handler"
  language="Java"
  code={codeLines}
  autoPlay={true}
  theme="dark"
/>`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Progress Tracking:</h4>
              <code className="block bg-muted p-3 rounded text-sm">
                {`<AchievementCard
  title="System Performance"
  value={414}
  target={500}
  unit=" RPS"
  description="Peak requests handled"
  color="#10B981"
/>`}
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Performance Notes */}
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">Performance Optimized</CardTitle>
          </CardHeader>
          <CardContent className="text-green-700 dark:text-green-300 space-y-2">
            <p>✅ <strong>Intersection Observer:</strong> Animations trigger only when visible</p>
            <p>✅ <strong>RAF Optimization:</strong> 60fps smooth animations with requestAnimationFrame</p>
            <p>✅ <strong>Memory Management:</strong> Proper cleanup of event listeners and timers</p>
            <p>✅ <strong>Accessibility:</strong> Respects reduced motion preferences</p>
            <p>✅ <strong>Mobile Responsive:</strong> Touch-friendly interactions and scaling</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DynamicElementsShowcase;