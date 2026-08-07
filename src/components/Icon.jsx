import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Boxes,
  Brain,
  CheckCircle,
  Code,
  Cpu,
  Database,
  ExternalLink,
  Globe,
  GraduationCap,
  Handshake,
  IdCard,
  Key,
  Layers,
  ListChecks,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Mic,
  Phone,
  Plug,
  Podcast,
  Rocket,
  Send,
  Server,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Terminal,
  TrendingUp,
  UserCog,
  Users,
  Waypoints,
  Zap,
  Workflow,
} from 'lucide-react';

const MAP = {
  server: Server,
  shield: ShieldCheck,
  terminal: Terminal,
  arrowdown: ArrowDown,
  mail: Mail,
  brain: Brain,
  code: Code,
  usercog: UserCog,
  trending: TrendingUp,
  handshake: Handshake,
  cpu: Cpu,
  plug: Plug,
  settings: Settings,
  boxes: Boxes,
  lock: Lock,
  key: Key,
  idcard: IdCard,
  checkcircle: CheckCircle,
  sparkles: Sparkles,
  database: Database,
  layers: Layers,
  cubes: Boxes,
  sitemap: Waypoints,
  zap: Zap,
  mobile: Smartphone,
  bot: Bot,
  messages: MessagesSquare,
  rocket: Rocket,
  podcast: Podcast,
  workflow: Workflow,
  listcheck: ListChecks,
  cart: ShoppingCart,
  globe: Globe,
  message: MessageCircle,
  github: Github,
  external: ExternalLink,
  arrowup: ArrowUpRight,
  send: Send,
  phone: Phone,
  mappin: MapPin,
  graduation: GraduationCap,
  users: Users,
  mic: Mic,
};

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
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
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
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}

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
