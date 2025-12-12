import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Copy, Play, Terminal, Code2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CodeLine {
  id: string;
  content: string;
  type?: 'comment' | 'keyword' | 'string' | 'function' | 'variable' | 'normal';
  indent?: number;
}

interface CodeSnippetProps {
  title: string;
  language: string;
  code: CodeLine[];
  description?: string;
  className?: string;
  autoPlay?: boolean;
  playSpeed?: number;
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light';
}

const AnimatedCodeSnippet = ({
  title,
  language,
  code,
  description,
  className = "",
  autoPlay = true,
  playSpeed = 100,
  showLineNumbers = true,
  theme = 'dark'
}: CodeSnippetProps) => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView && autoPlay && !isPlaying) {
      playAnimation();
    }
  }, [isInView, autoPlay, isPlaying]);

  const playAnimation = () => {
    setIsPlaying(true);
    setVisibleLines([]);
    setCurrentLine(0);

    const interval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= code.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        setVisibleLines(prevLines => [...prevLines, code[prev].id]);
        return prev + 1;
      });
    }, playSpeed);
  };

  const copyToClipboard = () => {
    const codeText = code.map(line => line.content).join('\n');
    navigator.clipboard.writeText(codeText);
  };

  const getLineColor = (type: string | undefined) => {
    if (theme === 'dark') {
      switch (type) {
        case 'comment': return 'text-green-400';
        case 'keyword': return 'text-blue-400';
        case 'string': return 'text-yellow-300';
        case 'function': return 'text-purple-400';
        case 'variable': return 'text-red-400';
        default: return 'text-gray-300';
      }
    } else {
      switch (type) {
        case 'comment': return 'text-green-600';
        case 'keyword': return 'text-blue-600';
        case 'string': return 'text-orange-600';
        case 'function': return 'text-purple-600';
        case 'variable': return 'text-red-600';
        default: return 'text-gray-700';
      }
    }
  };

  const themeClasses = theme === 'dark'
    ? 'bg-gray-900 border-gray-700'
    : 'bg-white border-gray-200';

  const headerTheme = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-gray-300'
    : 'bg-gray-50 border-gray-200 text-gray-700';

  return (
    <motion.div
      ref={ref}
      className={`rounded-lg border shadow-lg overflow-hidden ${themeClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${headerTheme}`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4" />
            <span className="font-medium">{title}</span>
            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
              {language}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={playAnimation}
            disabled={isPlaying}
            className="h-8 w-8 p-0"
          >
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Terminal className="h-4 w-4" />
              </motion.div>
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 w-8 p-0"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className={`px-4 py-2 text-sm border-b ${headerTheme}`}>
          {description}
        </div>
      )}

      {/* Code */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono">
          <AnimatePresence>
            {code.map((line, index) => (
              <motion.div
                key={line.id}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: visibleLines.includes(line.id) || !autoPlay ? 1 : 0.3,
                  x: visibleLines.includes(line.id) || !autoPlay ? 0 : -20,
                }}
                transition={{
                  duration: 0.3,
                  delay: autoPlay ? 0 : index * 0.1,
                }}
              >
                {showLineNumbers && (
                  <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                    {index + 1}
                  </span>
                )}
                <span
                  className={`${getLineColor(line.type)} whitespace-pre`}
                  style={{ paddingLeft: `${(line.indent || 0) * 20}px` }}
                >
                  {line.content}
                </span>

                {/* Cursor effect for current line */}
                {isPlaying && currentLine === index && (
                  <motion.span
                    className="inline-block w-2 h-5 bg-blue-400 ml-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </pre>

        {/* Progress indicator */}
        {isPlaying && (
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentLine + 1) / code.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.div>
  );
};

// Real code snippets from actual projects

// 1. DXC Technology - Stripe Webhook Handler
export const stripeWebhookCode: CodeLine[] = [
  { id: '1', content: '@PostMapping("/webhooks/stripe")', type: 'keyword' },
  { id: '2', content: 'public ResponseEntity<String> handleStripeWebhook(', type: 'function' },
  { id: '3', content: '    @RequestBody String payload,', type: 'variable', indent: 2 },
  { id: '4', content: '    @RequestHeader("Stripe-Signature") String signature) {', type: 'variable', indent: 2 },
  { id: '5', content: '', type: 'normal' },
  { id: '6', content: '    Event event = Webhook.constructEvent(', type: 'variable', indent: 1 },
  { id: '7', content: '        payload, signature, webhookSecret);', type: 'variable', indent: 2 },
  { id: '8', content: '', type: 'normal' },
  { id: '9', content: '    // Handle subscription events', type: 'comment', indent: 1 },
  { id: '10', content: '    switch (event.getType()) {', type: 'keyword', indent: 1 },
  { id: '11', content: '        case "customer.subscription.created":', type: 'string', indent: 2 },
  { id: '12', content: '            subscriptionService.activate(event);', type: 'function', indent: 3 },
  { id: '13', content: '            break;', type: 'keyword', indent: 3 },
  { id: '14', content: '        case "invoice.payment_succeeded":', type: 'string', indent: 2 },
  { id: '15', content: '            paymentService.updateStatus(event);', type: 'function', indent: 3 },
  { id: '16', content: '            break;', type: 'keyword', indent: 3 },
  { id: '17', content: '    }', type: 'normal', indent: 1 },
  { id: '18', content: '    return ResponseEntity.ok("Success");', type: 'keyword', indent: 1 },
  { id: '19', content: '}', type: 'normal' }
];

// 2. FIS Global - Merchant Payment Processing with Circuit Breaker
export const merchantPaymentCode: CodeLine[] = [
  { id: '1', content: '@Service', type: 'keyword' },
  { id: '2', content: 'public class MerchantPaymentService {', type: 'keyword' },
  { id: '3', content: '', type: 'normal' },
  { id: '4', content: '    @CircuitBreaker(name = "paymentProcessor",', type: 'keyword', indent: 1 },
  { id: '5', content: '        fallbackMethod = "processPaymentFallback")', type: 'keyword', indent: 2 },
  { id: '6', content: '    @RateLimiter(name = "paymentAPI")', type: 'keyword', indent: 1 },
  { id: '7', content: '    public PaymentResult processPayment(', type: 'function', indent: 1 },
  { id: '8', content: '            MerchantPaymentRequest request) {', type: 'variable', indent: 3 },
  { id: '9', content: '', type: 'normal' },
  { id: '10', content: '        // Validate merchant and amount', type: 'comment', indent: 2 },
  { id: '11', content: '        merchantValidator.validate(request);', type: 'function', indent: 2 },
  { id: '12', content: '', type: 'normal' },
  { id: '13', content: '        // Process with Redis caching', type: 'comment', indent: 2 },
  { id: '14', content: '        String cacheKey = generateKey(request);', type: 'variable', indent: 2 },
  { id: '15', content: '        PaymentResult cached = cache.get(cacheKey);', type: 'variable', indent: 2 },
  { id: '16', content: '        if (cached != null) return cached;', type: 'keyword', indent: 2 },
  { id: '17', content: '', type: 'normal' },
  { id: '18', content: '        PaymentResult result = gateway.process(request);', type: 'variable', indent: 2 },
  { id: '19', content: '        cache.put(cacheKey, result, 300);', type: 'function', indent: 2 },
  { id: '20', content: '        return result;', type: 'keyword', indent: 2 },
  { id: '21', content: '    }', type: 'normal', indent: 1 },
  { id: '22', content: '}', type: 'normal' }
];

export const microservicesCode: CodeLine[] = [
  { id: '1', content: 'apiVersion: apps/v1', type: 'keyword' },
  { id: '2', content: 'kind: Deployment', type: 'keyword' },
  { id: '3', content: 'metadata:', type: 'keyword' },
  { id: '4', content: '  name: payment-service', type: 'string', indent: 1 },
  { id: '5', content: 'spec:', type: 'keyword' },
  { id: '6', content: '  replicas: 3', type: 'variable', indent: 1 },
  { id: '7', content: '  selector:', type: 'keyword', indent: 1 },
  { id: '8', content: '    matchLabels:', type: 'keyword', indent: 2 },
  { id: '9', content: '      app: payment-service', type: 'string', indent: 3 },
  { id: '10', content: '  template:', type: 'keyword', indent: 1 },
  { id: '11', content: '    metadata:', type: 'keyword', indent: 2 },
  { id: '12', content: '      labels:', type: 'keyword', indent: 3 },
  { id: '13', content: '        app: payment-service', type: 'string', indent: 4 },
  { id: '14', content: '    spec:', type: 'keyword', indent: 2 },
  { id: '15', content: '      containers:', type: 'keyword', indent: 3 },
  { id: '16', content: '      - name: payment-service', type: 'string', indent: 4 },
  { id: '17', content: '        image: payment-service:latest', type: 'string', indent: 5 },
  { id: '18', content: '        ports:', type: 'keyword', indent: 5 },
  { id: '19', content: '        - containerPort: 8080', type: 'variable', indent: 6 }
];

// 3. L&T Finance - Credit Bureau Integration
export const creditBureauCode: CodeLine[] = [
  { id: '1', content: '@Service', type: 'keyword' },
  { id: '2', content: 'public class CreditBureauService {', type: 'keyword' },
  { id: '3', content: '', type: 'normal' },
  { id: '4', content: '    // Multi-bureau credit check aggregator', type: 'comment', indent: 1 },
  { id: '5', content: '    public CreditReport aggregateCreditScore(', type: 'function', indent: 1 },
  { id: '6', content: '            LoanApplication application) {', type: 'variable', indent: 3 },
  { id: '7', content: '', type: 'normal' },
  { id: '8', content: '        CompletableFuture<Score> experian = ', type: 'variable', indent: 2 },
  { id: '9', content: '            experianClient.fetchScore(application);', type: 'function', indent: 3 },
  { id: '10', content: '        CompletableFuture<Score> equifax = ', type: 'variable', indent: 2 },
  { id: '11', content: '            equifaxClient.fetchScore(application);', type: 'function', indent: 3 },
  { id: '12', content: '        CompletableFuture<Score> transunion = ', type: 'variable', indent: 2 },
  { id: '13', content: '            transunionClient.fetchScore(application);', type: 'function', indent: 3 },
  { id: '14', content: '', type: 'normal' },
  { id: '15', content: '        // Wait for all responses (timeout: 5s)', type: 'comment', indent: 2 },
  { id: '16', content: '        CompletableFuture.allOf(experian, equifax, transunion)', type: 'function', indent: 2 },
  { id: '17', content: '            .get(5, TimeUnit.SECONDS);', type: 'function', indent: 3 },
  { id: '18', content: '', type: 'normal' },
  { id: '19', content: '        return CreditReport.builder()', type: 'function', indent: 2 },
  { id: '20', content: '            .experianScore(experian.get())', type: 'function', indent: 3 },
  { id: '21', content: '            .equifaxScore(equifax.get())', type: 'function', indent: 3 },
  { id: '22', content: '            .transunionScore(transunion.get())', type: 'function', indent: 3 },
  { id: '23', content: '            .build();', type: 'function', indent: 3 },
  { id: '24', content: '    }', type: 'normal', indent: 1 },
  { id: '25', content: '}', type: 'normal' }
];

// 4. VelocIDE - AI Agent Code Generation
export const aiAgentCode: CodeLine[] = [
  { id: '1', content: '// AI Agent Service - VelocIDE', type: 'comment' },
  { id: '2', content: 'class AIAgentService {', type: 'keyword' },
  { id: '3', content: '  async generateCode(prompt: string, model: string) {', type: 'function', indent: 1 },
  { id: '4', content: '    const client = this.getClient(model);', type: 'variable', indent: 2 },
  { id: '5', content: '', type: 'normal' },
  { id: '6', content: '    // Stream response with 5ms latency', type: 'comment', indent: 2 },
  { id: '7', content: '    const stream = await client.generate({', type: 'variable', indent: 2 },
  { id: '8', content: '      prompt,', type: 'variable', indent: 3 },
  { id: '9', content: '      temperature: 0.7,', type: 'variable', indent: 3 },
  { id: '10', content: '      maxTokens: 2000', type: 'variable', indent: 3 },
  { id: '11', content: '    });', type: 'normal', indent: 2 },
  { id: '12', content: '', type: 'normal' },
  { id: '13', content: '    // Autonomous file operations', type: 'comment', indent: 2 },
  { id: '14', content: '    for await (const chunk of stream) {', type: 'keyword', indent: 2 },
  { id: '15', content: '      if (chunk.action === "CREATE_FILE") {', type: 'keyword', indent: 3 },
  { id: '16', content: '        await this.fileSystem.create(chunk.path);', type: 'function', indent: 4 },
  { id: '17', content: '      } else if (chunk.action === "MODIFY_FILE") {', type: 'keyword', indent: 3 },
  { id: '18', content: '        await this.fileSystem.update(chunk.path, chunk.content);', type: 'function', indent: 4 },
  { id: '19', content: '      }', type: 'normal', indent: 3 },
  { id: '20', content: '    }', type: 'normal', indent: 2 },
  { id: '21', content: '  }', type: 'normal', indent: 1 },
  { id: '22', content: '}', type: 'normal' }
];

export default AnimatedCodeSnippet;