import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from '@/components/ui/sidebar';

import { AlignLeft, HandCoins, Aperture, User2, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useUMKM } from '@/hooks/use-profile-umkm';
const sidebar = [
  {
    url: '/umkm',
    icon: AlignLeft,
    name: 'Rekap Pengajuan',
  },
  {
    url: '/ajukan-dana',
    icon: HandCoins,
    name: 'Ajukan Dana',
  },
  {
    url: '/umkm/posts',
    icon: Aperture,
    name: 'Posting Kegiatan',
  },
];

export function AppSidebar() {
  const { umkm, error, isLoading } = useUMKM();
  console.log(umkm);
  const router = useRouter();
  const logoutHandler = async () => {
    window.localStorage.removeItem('token');
    router.push('/');
  };
  return (
    <Sidebar>
      <SidebarHeader className='px-4 py-3 text-h6'>WiraDana</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebar.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <a href={project.url} className='flex items-center'>
                      <project.icon />
                      <span className='text-body-1'>{project.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {umkm?.umkm_name}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <span>Akun</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
