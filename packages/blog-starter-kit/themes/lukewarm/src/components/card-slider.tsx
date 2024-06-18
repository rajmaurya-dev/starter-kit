'use client';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { getPosts } from '@/lib/requests';
import { useInfiniteQuery } from '@tanstack/react-query';
import SliderBlogCard from './slider-blog-card';

export function CardSlider() {
	const { data, hasNextPage, isFetching, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
		getNextPageParam: (lastPage) =>
			lastPage.length < 5 ? undefined : lastPage[lastPage.length - 1].cursor,
		initialPageParam: '',
	});
	// if (!data) return null
	if (isFetching) return null;
	console.log(data);
	return (
		<Carousel className="mx-auto max-w-[300px] h-[425px] md:max-w-2xl">
			<CarouselContent>
				{data?.pages.map((group) =>
					group.map((post) => (
						<CarouselItem key={post.cursor}>
							<SliderBlogCard post={post.node} />
						</CarouselItem>
					)),
				)}
			</CarouselContent>
			<CarouselPrevious className="hidden md:flex bg-primary " />
			<CarouselNext className="hidden md:flex bg-primary" />
		</Carousel>
	);
}
