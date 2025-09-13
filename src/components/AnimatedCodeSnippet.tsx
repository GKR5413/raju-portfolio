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

// Sample code snippets for your experience
export const javaSpringBootCode: CodeLine[] = [
  { id: '1', content: '@RestController', type: 'keyword' },
  { id: '2', content: '@RequestMapping("/api/payments")', type: 'keyword' },
  { id: '3', content: 'public class PaymentController {', type: 'keyword' },
  { id: '4', content: '', type: 'normal', indent: 1 },
  { id: '5', content: '    @Autowired', type: 'keyword', indent: 1 },
  { id: '6', content: '    private PaymentService paymentService;', type: 'variable', indent: 1 },
  { id: '7', content: '', type: 'normal', indent: 1 },
  { id: '8', content: '    @PostMapping("/process")', type: 'keyword', indent: 1 },
  { id: '9', content: '    public ResponseEntity<PaymentResponse> processPayment(', type: 'function', indent: 1 },
  { id: '10', content: '            @RequestBody PaymentRequest request) {', type: 'variable', indent: 2 },
  { id: '11', content: '', type: 'normal', indent: 1 },
  { id: '12', content: '        // Validate payment request', type: 'comment', indent: 2 },
  { id: '13', content: '        PaymentResponse response = paymentService', type: 'variable', indent: 2 },
  { id: '14', content: '            .processPayment(request);', type: 'function', indent: 3 },
  { id: '15', content: '', type: 'normal', indent: 1 },
  { id: '16', content: '        return ResponseEntity.ok(response);', type: 'keyword', indent: 2 },
  { id: '17', content: '    }', type: 'normal', indent: 1 },
  { id: '18', content: '}', type: 'normal' }
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

export const reactHookCode: CodeLine[] = [
  { id: '1', content: 'const usePaymentProcessor = () => {', type: 'function' },
  { id: '2', content: '  const [loading, setLoading] = useState(false);', type: 'variable', indent: 1 },
  { id: '3', content: '  const [error, setError] = useState(null);', type: 'variable', indent: 1 },
  { id: '4', content: '', type: 'normal' },
  { id: '5', content: '  const processPayment = useCallback(async (data) => {', type: 'function', indent: 1 },
  { id: '6', content: '    setLoading(true);', type: 'function', indent: 2 },
  { id: '7', content: '    setError(null);', type: 'function', indent: 2 },
  { id: '8', content: '', type: 'normal' },
  { id: '9', content: '    try {', type: 'keyword', indent: 2 },
  { id: '10', content: '      const response = await api.post("/payments", data);', type: 'variable', indent: 3 },
  { id: '11', content: '      return response.data;', type: 'keyword', indent: 3 },
  { id: '12', content: '    } catch (err) {', type: 'keyword', indent: 2 },
  { id: '13', content: '      setError(err.message);', type: 'function', indent: 3 },
  { id: '14', content: '      throw err;', type: 'keyword', indent: 3 },
  { id: '15', content: '    } finally {', type: 'keyword', indent: 2 },
  { id: '16', content: '      setLoading(false);', type: 'function', indent: 3 },
  { id: '17', content: '    }', type: 'normal', indent: 2 },
  { id: '18', content: '  }, []);', type: 'normal', indent: 1 },
  { id: '19', content: '', type: 'normal' },
  { id: '20', content: '  return { processPayment, loading, error };', type: 'keyword', indent: 1 },
  { id: '21', content: '};', type: 'normal' }
];

export default AnimatedCodeSnippet;