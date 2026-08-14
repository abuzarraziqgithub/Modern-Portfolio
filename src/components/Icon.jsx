import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Award,
  BadgeCheck,
  Bot,
  Box,
  Boxes,
  Brain,
  Braces,
  Briefcase,
  Check,
  CheckCircle,
  CheckCircle2,
  Clock,
  Code,
  Coffee,
  Copy,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileCheck,
  FileCode,
  Flame,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  IdCard,
  Inbox,
  Infinity,
  Key,
  Layers,
  Lightbulb,
  Link2,
  ListChecks,
  Lock,
  Mail,
  MailOpen,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Mic,
  Network,
  Paperclip,
  PenLine,
  Phone,
  PhoneCall,
  Plug,
  Podcast,
  Puzzle,
  Quote,
  Rocket,
  Search,
  Send,
  Server,
  ServerCog,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  SquareTerminal,
  Star,
  Terminal,
  ThumbsUp,
  Timer,
  TrendingUp,
  User,
  UserCog,
  Users,
  Wand2,
  Waypoints,
  Workflow,
  X,
  Zap,
} from 'lucide-react';

export function Github(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Linkedin(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Smartphone(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

const MAP = {
  server: Server,
  servercog: ServerCog,
  shield: ShieldCheck,
  shieldalert: ShieldCheck,
  terminal: Terminal,
  sqterminal: SquareTerminal,
  arrowdown: ArrowDown,
  arrowright: ArrowRight,
  arrowup: ArrowUpRight,
  mail: Mail,
  mailopen: MailOpen,
  brain: Brain,
  code: Code,
  filecode: FileCode,
  filecheck: FileCheck,
  braces: Braces,
  usercog: UserCog,
  trending: TrendingUp,
  handshake: Handshake,
  cpu: Cpu,
  plug: Plug,
  settings: Settings,
  boxes: Boxes,
  box: Box,
  lock: Lock,
  key: Key,
  idcard: IdCard,
  checkcircle: CheckCircle,
  checkcircle2: CheckCircle2,
  badgecheck: BadgeCheck,
  sparkles: Sparkles,
  wand: Wand2,
  database: Database,
  layers: Layers,
  sitemap: Waypoints,
  zap: Zap,
  flame: Flame,
  mobile: Smartphone,
  bot: Bot,
  messages: MessagesSquare,
  message: MessageCircle,
  rocket: Rocket,
  podcast: Podcast,
  workflow: Workflow,
  listcheck: ListChecks,
  cart: ShoppingCart,
  globe: Globe,
  github: Github,
  linkedin: Linkedin,
  external: ExternalLink,
  send: Send,
  phone: Phone,
  phonecall: PhoneCall,
  mappin: MapPin,
  graduation: GraduationCap,
  users: Users,
  user: User,
  mic: Mic,
  atsign: AtSign,
  copy: Copy,
  search: Search,
  download: Download,
  coffee: Coffee,
  clock: Clock,
  award: Award,
  network: Network,
  gitbranch: Link2,
  link: Link2,
  paperclip: Paperclip,
  briefcase: Briefcase,
  inbox: Inbox,
  penline: PenLine,
  puzzle: Puzzle,
  lightbulb: Lightbulb,
  thumbsup: ThumbsUp,
  heart: Heart,
  timer: Timer,
  infinity: Infinity,
  quote: Quote,
  check: Check,
  x: X,
  star: Star,
};

export default function Icon({ name, className, size }) {
  const Cmp = MAP[name] || Server;
  return <Cmp className={className} size={size} aria-hidden="true" />;
}

export function TechIcon({ slug, color, size = 14, className }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
