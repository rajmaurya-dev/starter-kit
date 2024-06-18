'use client'

import { cabin,fira_sans } from "@/app/font"
import { Button } from "@/components/ui/button"
import { NavigationMenu,NavigationMenuLink,NavigationMenuList } from "@/components/ui/navigation-menu"
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet"
import { getBlogName,getSeriesList } from "@/lib/requests"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import Author from "./Author"
import Newsletter from "./newsletter"
import ThemeToggler from "./theme-toggler"

import { usePathname } from "next/navigation"



export default function MenuBar() {
	const pathname = usePathname();
	const isActive = (path:any) => path === pathname;    
	const { data: seriesList, isLoading, error } = useQuery({
        queryKey: ["seriesList"],
        queryFn: getSeriesList
    });
    const { data: title, isLoading: isLoadingTile } = useQuery({
        queryKey: ["blogName"],
        queryFn: getBlogName
    })

    return (
			<header className="bg-background mb-2 flex h-20 w-full shrink-0 items-center px-4 shadow shadow-[#2f3c7f56] rounded-b-3xl md:px-6">
				<Sheet>
					<SheetTrigger asChild>
						<Button className="lg:hidden" size="icon" variant="outline">
							<HamburgerMenuIcon />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<h1 className="ml-2 block w-[200px] whitespace-nowrap font-semibold md:hidden">
						{title?.title}
					</h1>
					<SheetContent side="left" className="overflow-y-auto">
						<Link className="mb-2 flex items-center gap-2" href="/">
							<img src={title?.favicon} alt={title?.title} className="w-10 rounded-md" />
							<h1 className="text-xl font-bold text-blue-800 md:text-2xl">{title?.title}</h1>
						</Link>
						<Author />
						<div className="flex justify-center">
							<Newsletter />
						</div>
						<div className="grid gap-2 py-6">
							{seriesList?.map((series) => (
								<Link
									href={`/series/${series.node.slug}`}
									key={series.node.id}
									className="inline-flex h-9 w-max items-center justify-center rounded-md  px-4 py-2 text-sm font-medium transition-colors  hover:text-gray-900  focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
								>
									{series.node.name}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>
				<div className="inline-block w-fit">
					<Link href={'/'} className="mr-6 hidden items-center gap-2 lg:flex ">
						<img src={title?.favicon} alt={title?.title} className="w-10 rounded-md" />
						<h1
							className={`${fira_sans.className}  whitespace-nowrap text-2xl font-semibold`}
						>
							{title?.title}
						</h1>
					</Link>
				</div>
				<div className="flex w-full justify-center">
					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList>
							<NavigationMenuLink asChild>
							<Link
										href={`/`}
									
										className={`${cabin.className} hover:text-accent  focus:text-accent inline-flex h-9 w-max items-center  justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
									>
										Home
									</Link>
							</NavigationMenuLink>
							{seriesList?.map((series) => (
								<NavigationMenuLink asChild>
									<Link
										href={`/series/${series.node.slug}`}
										key={series.node.id}
										className={`${cabin.className} hover:text-accent  focus:text-accent inline-flex h-9 w-max items-center  justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
									>
										{series.node.name}
									</Link>
								</NavigationMenuLink>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="ml-auto flex">
				
					<div className="hidden md:block">
						<Newsletter className="border py-4 text-base" />
					</div>
				</div>
			</header>
		);
}




