"use client";

import SearchBar from "@/app/components/common/input/SearchBar";
import MessageCard from "@/app/components/common/card/MessageCard";
import { useState } from "react";
import "./page.css";
import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import FloatingMenuButton from "@/app/components/common/button/FloatingMenuButton";

export default function MessagePage() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    if (searchValue != value) console.log("debounce Value", value);
  };
  return (
    <div className="page-container">
      <div className="search-bar-container">
        <SearchBar
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="검색어 (이름, 제목, 태그)"
        />
      </div>

      {/* todo : tag List */}

      <div className="message-list">
        <MessageCard
          title="TEST"
          content="asdfghjkl"
          tags={[]}
          customers={[]}
          created_at="8월 12일 8시 23분"
        />

        <MessageCard
          title="TEST"
          content="asdfghjkl"
          tags={[
            { tagId: 2, tagName: "test", tagColor: "RED" },
            { tagId: 3, tagName: "test", tagColor: "RED" },
          ]}
          customers={[]}
          created_at="8월 12일 8시 23분"
        />

        <MessageCard
          title="TEST"
          content="asdfghjkl"
          tags={[]}
          customers={[]}
          created_at="8월 12일 8시 23분"
        />

        <FloatingMenuButton>
          <div>
            <ul>
              <li>메세지 작성하기</li>
              <li>AI 도움 받아 작성하기</li>
            </ul>
          </div>
        </FloatingMenuButton>
      </div>
    </div>
  );
}