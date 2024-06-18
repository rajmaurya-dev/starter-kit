
import Author from "@/components/Author";
import Social from "@/components/Social";
import Articles from "@/components/articles";
import CardAnimation from "@/components/card-animation";
import { CardSlider } from "@/components/card-slider";
import Newsletter from "@/components/newsletter";
import { getPosts } from "@/lib/requests";
import { PostMetadata } from "@/lib/types";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import Image from "next/image";
import { eczar } from "./font";

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    getNextPageParam: (lastPage: { node: PostMetadata; cursor: string }[]) => lastPage.length < 5 ? undefined : lastPage[lastPage.length - 1].cursor,
    initialPageParam: ""
  })
  return (
    <main className="max-w-7xl w-full px-3 xl:p-0 mx-auto">
      <section className="flex gap-5">

        {/* main content */}
        <div className="flex flex-col gap-5 ">
          <div className="mx-2">

            <CardSlider />
          </div>
          <div className="md:w-full flex-1 flex flex-col gap-2 mt-5">
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Articles />
            </HydrationBoundary>
          </div>
        </div>
        {/* right sidebar */}
        <div className="md:w-1/3 mx-auto md:flex flex-col hidden ">
          <CardAnimation>
            <Author />
          </CardAnimation>
          <div className={`mx-auto flex flex-col items-center py-20 ${eczar.className} h-[207px]`}>
            <p className="text-center text-2xl">Receive monthly book <br />recommendations</p>
          <Newsletter title="Count me in!" className="text-base py-2 px-4 w-full rounded-3xl" />
          </div>
          <div className="py-7">

          <Social />
          </div>
        </div>
      </section>

    </main>
  );
}