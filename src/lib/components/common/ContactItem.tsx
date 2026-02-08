import { Contact } from "@/src/lib/types/contact"
import Link from "next/link"
import * as Icons from "lucide-react"

function ContactItem({ data }: { data: Contact }) {
    const IconComponent = (Icons as any)[data.icon] || Icons.Link

    return (
        <Link 
            href={data.url}
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                <IconComponent className="w-5 h-5 text-gray-700" />
            </div>
            <span className="font-medium text-gray-900">{data.name}</span>
        </Link>
    )
}

export default ContactItem