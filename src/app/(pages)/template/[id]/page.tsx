"use client";

import { useEffect, useState } from "react";
import {
  getSingleTemplateAPI,
  postDuplicateTemplateAPI,
} from "@/app/api/template/templateAPI";
import Header from "@/app/components/layout/Header";
import HashLoading from "@/app/components/common/loading/HashLoading";
import "./page.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ApiResponse {
  templateId: number;
  templateTitle: string;
  templateContent: string;
  image: string;
  usageCount: number;
  createdAt: string;
}

interface TemplateIdProps {
  params: {
    id: string;
  };
}

export default function TemplateId({ params }: TemplateIdProps) {
  const router = useRouter();
  const { id } = params;
  const [templateData, setTemplateData] = useState<ApiResponse>({
    templateId: Number(id),
    templateTitle: "",
    templateContent: "",
    image: "",
    usageCount: 0,
    createdAt: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSingleTemplate = async () => {
      try {
        const response = await getSingleTemplateAPI({ templateId: Number(id) });
        setTemplateData(response?.result);
      } catch (error) {
        console.error("단일 템플릿 데이터 가져오는 중에 오류 발생: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getSingleTemplate();
    }
  }, [id]);

  const handleCopy = async () => {
    const token = Cookies.get("accessToken");
    if (!token) return;
    try {
      const response = await postDuplicateTemplateAPI({
        token,
        templateId: Number(id),
      });

      if (response?.code === "S10000") router.push("/customized");
    } catch (error) {
      console.error("post duplicate API 실패", error);
    }
  };

  const handleMyCustom = () => {
    console.log("내 커스텀으로 가져오기");
  };

  if (isLoading) {
    return <HashLoading />;
  }

  return (
    <div className="page-container">
      <Header title={templateData.templateTitle} showBackIcon={true} />
      <div className="template-id_button-group">
        <button
          onClick={handleCopy}
          type="button"
          className="template-id_button blue_button"
        >
          복사하기
        </button>
        <button
          onClick={handleMyCustom}
          type="button"
          className="template-id_button blue_button"
        >
          내 커스텀으로 가져오기
        </button>
      </div>

      <div className="template-id_count-group body-small">
        인용수: {templateData?.usageCount}
      </div>

      <div className="template-id_content-body">
        {templateData?.templateContent}
      </div>
    </div>
  );
}