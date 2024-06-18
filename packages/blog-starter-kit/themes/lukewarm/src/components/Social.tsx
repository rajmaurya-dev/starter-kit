'use client'
import { getAuthor, getBlogName } from '@/lib/requests';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaStackOverflow, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { RiCamera2Fill } from 'react-icons/ri';
import { TfiGithub, TfiLink, TfiLinkedin } from 'react-icons/tfi';
import { Card } from './ui/card';
import { fira_sans } from '@/app/font';

export default function Social() {
    const { data: title, isLoading: isLoadingTile } = useQuery({
        queryKey: ["blogName"],
        queryFn: getBlogName
    })
    const username = title?.userName;
    const { data: author, isLoading, error } = useQuery({
        queryKey: ["author", username],
        queryFn: () => getAuthor(username!)
    });
    return (
        <Card className={`${fira_sans.className} flex flex-col gap-5 items-start py-10 my-5 bg-primary`}>
            <div className='flex gap-5 justify-start items-center px-20'>
            {author?.socialMediaLinks.website && (
                <div className='flex items-center w-fit justify-center'>
                    <Link href={author.socialMediaLinks.website} target="_blank" className="text-[#fef8ee] text-4xl">
                        <TfiLink />
                    </Link>
                </div>
            )}
            {author?.socialMediaLinks.github && (
                <div className='flex items-center w-fit justify-center'>
                    
                    <Link href={author.socialMediaLinks.github} target="_blank" className="text-[#fef8ee] text-4xl">
                        <TfiGithub />
                    </Link>
                </div>
            )}
            {author?.socialMediaLinks.stackoverflow && (
                <div className='flex items-center w-fit justify-center'>
                
                    <Link href={author.socialMediaLinks.stackoverflow} target="_blank" className="text-[#fef8ee] text-4xl">
                        <FaStackOverflow />
                    </Link>
                </div>
            )}
            {author?.socialMediaLinks.twitter && (
                <div className='flex items-center w-fit justify-center'>
                    
                    <Link href={author.socialMediaLinks.twitter} target="_blank" className="text-[#fef8ee] text-4xl">
                        <FaSquareXTwitter />
                    </Link>
                </div>
            )}
            </div>
            <div className="flex gap-5 items-center justify-center px-20">



            {author?.socialMediaLinks.linkedin && (
                <div className='flex items-center w-fit justify-center'>
                    
                    <Link href={author.socialMediaLinks.linkedin} target="_blank" className="text-[#fef8ee] text-4xl">
                        <TfiLinkedin />
                    </Link>
                </div>
            )}
            {author?.socialMediaLinks.youtube && (
                <div className='flex items-center w-fit justify-center'>
                    
                    <Link href={author.socialMediaLinks.youtube} target="_blank" className="text-[#fef8ee] text-4xl">
                        <FaYoutube />
                    </Link>
                </div>
            )}
            {author?.socialMediaLinks.instagram && (
                <div className='flex items-center w-fit justify-center'>
                    
                    <Link href={author.socialMediaLinks.instagram} target="_blank" className="text-[#fef8ee] text-4xl">
                        <RiCamera2Fill />
                    </Link>
                </div>
            )}
            {author?.socialMediaLinks.facebook && (
                <div className='flex items-center w-fit justify-center'>
                    
                    <Link href={author.socialMediaLinks.facebook} target="_blank" className="text-[#fef8ee] text-4xl">
                        <FaFacebook />
                    </Link>
                </div>
            )}
            </div>
            
        </Card>
    )
}
