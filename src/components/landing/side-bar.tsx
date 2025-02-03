import { Home, HelpCircle, Tag, Bookmark, Users, Building2 } from 'lucide-react';
import { Button } from "~/components/ui/button";
import Link from 'next/link';

const menus = [
    { title: 'Home', icon: Home, href: '/' },
    { title: 'Questions', icon: HelpCircle, href: '/questions' },
    { title: 'Tags', icon: Tag, href: '/tags' },
    { title: 'Save', icon: Bookmark, href: '/saved' },
    { title: 'Users', icon: Users, href: '/users' },
    { title: 'Companies', icon: Building2, href: '/companies' }
];

export const LandingSideBar = () => {
    return (      
        <aside className="col-span-2 border-r">
            <div className="flex flex-col gap-2 p-4">
                {menus.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link href={item.href} key={item.title}>
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start gap-2 hover:bg-accent"
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.title}</span>
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};
