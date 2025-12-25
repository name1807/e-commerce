"use client"
import { useState, useEffect, useCallback } from 'react'
import { twMerge } from 'tailwind-merge';

import { Button } from '@heroui/react';

import { ArrowUpIcon } from 'lucide-react';

export default function ScrollToTopButton() {
  const [scrollY, setScrollY] = useState(0);
  const minScrollY = 100;

  const handlePress = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button
      onPress={handlePress}
      variant="bordered"
      radius='full'
      className={twMerge('fixed bottom-4 right-4 z-50 bg-background', scrollY > minScrollY ? 'flex' : "hidden")}
      isIconOnly
    >
      <ArrowUpIcon size={20} />
    </Button>
  )
}
