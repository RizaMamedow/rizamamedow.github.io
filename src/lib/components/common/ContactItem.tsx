import { Contact } from "@/src/lib/types/contact"
import Link from "next/link"
import * as Icons from "lucide-react"

function ContactItem({ data }: { data: Contact }) {
    const IconComponent = (Icons as any)[data.icon] || Icons.Link

    return (
        <Link 
            href={data.url}
            className="flex items-center p-3 border hover:border-primary hover:bg-primary/30 group"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="flex items-center justify-center">
                <IconComponent className="text-white group-hover:text-primary"/>
            </div>
        </Link>
    )
}

export default ContactItem