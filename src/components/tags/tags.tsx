// app/components/Tags.tsx
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import { Search } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Badge } from "~/components/ui/badge";

// Types
interface Tag {
  id: string;
  name: string;
  description: string;
  questionsCount: number;
  askedToday: number;
  askedThisWeek: number;
  askedThisMonth?: number;
}

enum SortType {
  Popular = 'Popular',
  Name = 'Name',
  New = 'New'
}

interface TagsProps {
  initialTags: Tag[];
}

export const Tags: React.FC<TagsProps> = ({ initialTags }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSortType, setActiveSortType] = useState<SortType>(SortType.Popular);
  const [showSynonyms, setShowSynonyms] = useState<boolean>(false);

  // Filter and sort tags based on search query and active sort type
  const filteredTags = useMemo(() => {
    let result = [...initialTags];
    
    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter(tag => 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort tags
    switch (activeSortType) {
      case SortType.Popular:
        return result.sort((a, b) => b.questionsCount - a.questionsCount);
      case SortType.Name:
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case SortType.New:
        return result.sort((a, b) => b.askedToday - a.askedToday);
      default:
        return result;
    }
  }, [initialTags, searchQuery, activeSortType]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tags</h1>
      
      <p className="mb-6 text-muted-foreground">
        A tag is a keyword or label that categorizes your question with other, similar questions. 
        Using the right tags makes it easier for others to find and answer your question.
      </p>
      
      {/* Synonyms toggle */}
      <Toggle
        pressed={showSynonyms}
        onPressedChange={setShowSynonyms}
        variant="outline"
        className="mb-6 text-primary"
      >
        {showSynonyms ? 'Hide tag synonyms' : 'Show all tag synonyms'}
      </Toggle>
      
      {/* Search and filter section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input 
            type="search" 
            className="pl-10"
            placeholder="Filter by tag name" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <ToggleGroup type="single" value={activeSortType} onValueChange={(value : SortType) => value && setActiveSortType(value)}>
          {Object.values(SortType).map((sortType) => (
            <ToggleGroupItem key={sortType} value={sortType}>
              {sortType}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      
      {/* Tags grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTags.map((tag) => (
          <Card key={tag.id} className="hover:shadow-md">
            <CardContent className="pt-4">
              <Link href={`/questions/tagged/${tag.name}`} className="mb-2 inline-block">
                <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                  {tag.name}
                </Badge>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {tag.description}
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-between text-xs text-muted-foreground pt-0">
              <div>{tag.questionsCount.toLocaleString()} questions</div>
              <div>
                {tag.askedToday > 0 && `${tag.askedToday} asked today, `}
                {tag.askedThisWeek > 0 && `${tag.askedThisWeek} this week`}
                {tag.askedThisMonth && tag.askedThisMonth > 0 && `, ${tag.askedThisMonth} this month`}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};