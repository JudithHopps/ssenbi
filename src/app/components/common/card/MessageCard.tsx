import React from "react";
import Image from "next/image";
import "./MessageCard.css";
import BorderTag from "../tag/BorderTag";
import { TagColorTypes } from "@/types/tag/tagTypes";
interface Tag {
  tagId: number;
  tagName: string;
  tagColor: TagColorTypes;
}

interface Customer {
  customerId: number;
  customerName: string;
  customerColor: string;
}

interface MessageCardProps {
  title?: string;
  content: string;
  created_at: string;
  tags: Tag[];
  customers: Customer[];
}

interface ApiResponse {
  code: string;
  message: string;
  result: Message[];
}

interface Message {
  messageId: number;
  messageContent: string;
  sendedAt: string;
  tags: Tag[];
  customers: Customer[];
}

export default function MessageCard({
  title = "",
  content,
  tags,
  created_at,
}: MessageCardProps) {
  return (
    <div className="message-card">
      <p className="message-card__content body">{content}</p>

      <div className="message-card__details">
        {/* todo : tagList */}
        <div className="message-tag-container">
          {/* created_at width 제외하고 100% overflow hidden */}
          {tags.map((tag) => (
            <BorderTag color={tag.tagColor} tagName={tag.tagName} />
          ))}
          {/*
          {customers.map((customer) => (
            <Fileld>{customer.customerName}</Fileld>
            ))} */}
        </div>
        <p className="message-card__description body-small">{created_at}</p>
      </div>
    </div>
  );
}