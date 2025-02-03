import Link from "next/link";
import { title } from "process";
import { Button } from "~/components/ui/button";

const links=[{title:"About",link:"#"},
            {title:"Product",link:"#"},
            {title:"OverflowAI",link:"#"}
]

export const NavBar = () =>{
    return(
    
        <nav className="flex items-center gap-3">
            {links.map( (link,index)=>(<Button variant= "secondary" key={index} asChild>
                <Link href={link.link}>{link.title}</Link>
                </Button>)) }
           
        </nav>
        
    );

} 