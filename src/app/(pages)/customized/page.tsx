"use client";

import { useState } from "react";
import "./page.css";
import Header from "@/app/components/layout/Header";
import Link from "next/link";
import FloatingActionButton from "@/app/components/common/button/FloatingActionButton";
import CustomizedCard from "@/app/components/common/card/CustomizedCard";
import { useRouter } from "next/navigation";
import { CustomerType, TagType } from "@/types/tag/tagTypes";

// Custom Template 타입 정의
interface CustomTemplate {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  templateUsageCount: number;
  templateCreatedAt: string;
  templateTags: TagType[];
  templateCustomers: CustomerType[];
}

// ApiResponse 타입 정의
type ApiResponse = CustomTemplate[];

// dummyData 선언
const dummyData: ApiResponse = [
  {
    templateId: 1,
    templateTitle: "직장인 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 10,
    templateCreatedAt: "2024-10-25T01:22:27",
    templateTags: [{ tagId: 1, tagName: "직장인", tagColor: "GREEN" }],
    templateCustomers: [
      { customerId: 12, customerName: "홍길동", customerColor: "GREEN" },
    ],
  },
  {
    templateId: 2,
    templateTitle: "학생 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 5,
    templateCreatedAt: "2024-10-26T01:22:27",
    templateTags: [{ tagId: 2, tagName: "학생", tagColor: "PINK" }],
    templateCustomers: [
      { customerId: 13, customerName: "김철수", customerColor: "PINK" },
    ],
  },
  {
    templateId: 3,
    templateTitle: "자동차 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 3,
    templateCreatedAt: "2024-10-27T01:22:27",
    templateTags: [{ tagId: 3, tagName: "자동차", tagColor: "SALMON" }],
    templateCustomers: [
      { customerId: 14, customerName: "이영희", customerColor: "SALMON" },
    ],
  },
  {
    templateId: 4,
    templateTitle: "단골 고객 템플릿",
    templateContent: "이 템플릿의 목적",
    templateUsageCount: 8,
    templateCreatedAt: "2024-10-28T01:22:27",
    templateTags: [{ tagId: 4, tagName: "단골 고객", tagColor: "RED" }],
    templateCustomers: [
      { customerId: 15, customerName: "박수진", customerColor: "RED" },
    ],
  },
];

export default function CustomizedPage() {
  const router = useRouter();
  const [filteredCustomMessageTemplates] = useState<ApiResponse | null>(
    dummyData,
  );

  // useEffect(() => {
  //   const fetchCustomTemplates = async () => {
  //     try {
  //       const token = "ACCESS_TOKEN";
  //       const data = await getCustomTemplatesAPI({ token });
  //       setFilteredMessageTemplates(data.result[0]?.generalTemplates);
  //     } catch (error) {
  //       console.error("Error fetching message:", error);
  //     }
  //   };

  //   fetchCustomMessage();
  // }, []);

  const handleNewTemplate = () => {
    router.push("/customized/new");
  };

  return (
    <div className="page-container">
      <Header title="커스텀" />

      {filteredCustomMessageTemplates?.map((message) => (
        <Link
          key={message?.templateId}
          href={`/customized/${message?.templateId}`}
        >
          <CustomizedCard
            title={message?.templateTitle}
            content={message?.templateContent}
            tags={message?.templateTags}
            customers={message?.templateCustomers}
          />
        </Link>
      ))}

      <FloatingActionButton onClick={handleNewTemplate} text={"템플릿 추가"} />
    </div>
  );
}