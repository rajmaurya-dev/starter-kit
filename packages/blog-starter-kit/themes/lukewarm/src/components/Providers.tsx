'use client'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import React,{ useState } from 'react'
import { ThemeProvider } from './theme-provider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="class" defaultTheme="root" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</QueryClientProvider>
		);
}

export default Providers