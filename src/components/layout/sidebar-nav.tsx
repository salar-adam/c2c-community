
import {
  LayoutDashboard,
  Users,
  Trophy,
  ScanSearch,
  MessageSquare,
  FileText,
  Briefcase,
  User,
  Settings,
  FlaskConical,
  Rocket,
  Compass,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { GeoNexusLogo, RockHammerIcon } from "@/components/icons";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/community", label: "Community", icon: Users },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/geomyths", label: "GeoMyth Busters", icon: FlaskConical },
  { href: "/planetary-geology", label: "Planetary Geology", icon: Rocket },
  { href: "/career-compass", label: "Career Compass", icon: Compass },
  { href: "/rock-vault", label: "Rock Vault", icon: RockHammerIcon },
];

const aiToolsNav = [
  { href: "/identify-image", label: "Image Identifier", icon: ScanSearch },
  { href: "/geoinfo", label: "GeoInfo", icon: MessageSquare },
  { href: "/summarize-data", label: "Summary", icon: FileText },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <GeoNexusLogo className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">GeoNexus</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
            <div className="px-2 text-xs font-medium text-muted-foreground">Tools</div>
            {aiToolsNav.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                    <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <span>
                        <item.icon />
                        <span>{item.label}</span>
                    </span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/profile" passHref>
              <SidebarMenuButton asChild isActive={isActive('/profile')} tooltip="Profile">
                <span>
                  <User />
                  <span>Profile</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/settings" passHref>
              <SidebarMenuButton asChild isActive={isActive('/settings')} tooltip="Settings">
                <span>
                  <Settings />
                  <span>Settings</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
