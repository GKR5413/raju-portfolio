import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MagneticElement from "./MagneticElement";
import ParallaxSection, { ParallaxElement, ParallaxLayer } from "./ParallaxSection";
import TextReveal, { AnimatedCounter, StaggeredFade } from "./TextReveal";

const AnimationShowcase = () => {
  return (
    <div className="min-h-screen p-8 space-y-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          <TextReveal animationType="wave" splitBy="char">
            Animation Showcase
          </TextReveal>
        </h1>

        {/* Magnetic Elements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Magnetic Cursor Effects</CardTitle>
            <CardDescription>
              Elements that subtly follow cursor movement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              <MagneticElement strength={0.2}>
                <Button variant="outline">Subtle Magnetic (0.2)</Button>
              </MagneticElement>
              <MagneticElement strength={0.4}>
                <Button>Medium Magnetic (0.4)</Button>
              </MagneticElement>
              <MagneticElement strength={0.6}>
                <Button variant="destructive">Strong Magnetic (0.6)</Button>
              </MagneticElement>
            </div>
            <p className="text-sm text-muted-foreground">
              Usage: {`<MagneticElement strength={0.3}><Button>Button</Button></MagneticElement>`}
            </p>
          </CardContent>
        </Card>

        {/* Text Reveal Animations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Text Reveal Animations</CardTitle>
            <CardDescription>
              Various text animation styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Fade Animation:</h3>
              <TextReveal animationType="fade" delay={0.2}>
                This text fades in smoothly
              </TextReveal>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Slide Animation:</h3>
              <TextReveal animationType="slide" delay={0.2}>
                This text slides up as it appears
              </TextReveal>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Wave Animation:</h3>
              <TextReveal animationType="wave" delay={0.2} splitBy="char">
                Each character waves in
              </TextReveal>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Typewriter Animation:</h3>
              <TextReveal animationType="typewriter" delay={0.2}>
                This types out character by character
              </TextReveal>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Glitch Animation:</h3>
              <TextReveal animationType="glitch" delay={0.2}>
                This has a glitch effect
              </TextReveal>
            </div>
          </CardContent>
        </Card>

        {/* Animated Counters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Animated Counters</CardTitle>
            <CardDescription>
              Numbers that count up when in view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  <AnimatedCounter from={0} to={100} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">
                  <AnimatedCounter from={0} to={1250} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  <AnimatedCounter from={0} to={99.9} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">
                  <AnimatedCounter from={0} to={24} suffix="/7" />
                </div>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parallax Effects */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Parallax Scroll Effects</CardTitle>
            <CardDescription>
              Elements that move at different speeds during scroll
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg overflow-hidden">
              <ParallaxElement speed={0.2} className="absolute top-4 left-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
              </ParallaxElement>
              <ParallaxElement speed={0.5} className="absolute top-8 right-8">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </ParallaxElement>
              <ParallaxElement speed={-0.3} className="absolute bottom-4 left-1/2">
                <div className="w-10 h-10 bg-green-500 rounded-full"></div>
              </ParallaxElement>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-lg font-semibold">Scroll to see parallax effects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staggered Fade */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Staggered Animations</CardTitle>
            <CardDescription>
              Multiple elements that animate in sequence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StaggeredFade className="space-y-4" stagger={0.2}>
              {[
                "First item appears",
                "Then the second item",
                "Followed by the third",
                "And finally the last one"
              ].map((text, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  {text}
                </div>
              ))}
            </StaggeredFade>
          </CardContent>
        </Card>

        {/* Usage Examples */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Examples</CardTitle>
            <CardDescription>
              Code examples for using these animations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Magnetic Element:</h4>
              <code className="block bg-muted p-2 rounded">
                {`<MagneticElement strength={0.3}>
  <Button>Magnetic Button</Button>
</MagneticElement>`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Text Reveal:</h4>
              <code className="block bg-muted p-2 rounded">
                {`<TextReveal animationType="wave" splitBy="char" delay={0.2}>
  Your text here
</TextReveal>`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Animated Counter:</h4>
              <code className="block bg-muted p-2 rounded">
                {`<AnimatedCounter from={0} to={100} suffix="%" duration={2} />`}
              </code>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Parallax Section:</h4>
              <code className="block bg-muted p-2 rounded">
                {`<ParallaxSection speed={0.3} direction="up">
  <YourContent />
</ParallaxSection>`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimationShowcase;