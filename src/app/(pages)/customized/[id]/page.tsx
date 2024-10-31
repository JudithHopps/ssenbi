"use client";

import { useState } from "react";
import "./page.css";
import Header from "@/app/components/layout/Header";
import BorderTag from "@/app/components/common/tag/BorderTag";
import FilledTag from "@/app/components/common/tag/FilledTag";
import { useRouter } from "next/navigation";
import { deleteCustomTemplateAPI } from "@/app/api/customized/customizedAPI";
import Modal from "@/app/components/common/modal/Modal";
import { CustomizedModifyForm } from "@/app/components/common/modal/CustomizedModifyForm";
import { CustomizedModifyAI } from "@/app/components/common/modal/CustomizedModifyAI"; // Import CustomizedModifyAI
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
type ApiResponse = CustomTemplate;

// dummyData 선언
const dummyData: ApiResponse = {
  templateId: 1,
  templateTitle: "직장인 템플릿",
  templateContent: "이 템플릿의 목적",
  templateUsageCount: 10,
  templateCreatedAt: "2024-10-25T01:22:27",
  templateTags: [{ tagId: 1, tagName: "직장인", tagColor: "GREEN" }],
  templateCustomers: [
    {
      customerId: 12,
      customerName: "홍길동",
      customerColor: "GREEN",
    },
    {
      customerId: 13,
      customerName: "김철수",
      customerColor: "PINK",
    },
    {
      customerId: 14,
      customerName: "이영희",
      customerColor: "SALMON",
    },
    {
      customerId: 15,
      customerName: "박수진",
      customerColor: "RED",
    },
  ],
};

interface ModifiedTemplate {
  templateTitle: string;
  templateContent: string;
  templateAfterTagIds: number[];
  templateAfterCustomerIds: number[];
}

interface CustomizedIdPageProps {
  params: {
    id: string;
  };
}

export default function CustomizedIdPage({ params }: CustomizedIdPageProps) {
  const router = useRouter();
  const { id } = params;
  const [customMessageTemplate] = useState<ApiResponse | null>(dummyData);
  const [modifiedTemplate, setModifiedTemplate] =
    useState<ModifiedTemplate | null>({
      templateTitle: dummyData.templateTitle,
      templateContent: dummyData.templateContent,
      templateAfterTagIds: dummyData.templateTags.map((tag) => tag.tagId), // Extract only tag IDs
      templateAfterCustomerIds: dummyData.templateCustomers.map(
        (customer) => customer.customerId,
      ),
    });
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isAIEdit, setAIEdit] = useState<boolean>(false);
  const [, setEdit] = useState<boolean>(false);

  const handleDelete = async () => {
    const token = "your-auth-token";
    try {
      const response = await deleteCustomTemplateAPI({
        token,
        templateId: Number(id),
      });
      if (response.code === "S10000") {
        router.push("/customized");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const openAIEditModal = () => {
    setAIEdit(true);
    setEdit(false);
    setModalOpen(true);
  };

  const openEditModal = () => {
    setEdit(true);
    setAIEdit(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAIEdit(false);
    setEdit(false);
  };

  const handleSaveTemplate = async (
    title?: string,
    content?: string,
    beforeTags?: number[],
    afterTags?: number[],
    beforeCustomerIds?: number[],
    afterCustomerIds?: number[],
  ) => {
    if (modifiedTemplate === null) return;

    const putCustomTemplateParams = {
      token: "your-auth-token",
      templateId: Number(id),
      title: title ?? modifiedTemplate.templateTitle,
      content: content ?? modifiedTemplate.templateContent,
      beforeTags: beforeTags ?? [],
      afterTags: afterTags ?? modifiedTemplate.templateAfterTagIds,
      beforeCustomerIds: beforeCustomerIds ?? [],
      afterCustomerIds:
        afterCustomerIds ?? modifiedTemplate.templateAfterCustomerIds,
    };

    try {
      // TODO: 다시 get
      // const response = await putCustomTemplateAPI(putCustomTemplateParams);
      setModifiedTemplate({
        templateTitle: putCustomTemplateParams.title,
        templateContent: putCustomTemplateParams.content,
        templateAfterTagIds: putCustomTemplateParams.afterTags,
        templateAfterCustomerIds: putCustomTemplateParams.afterCustomerIds,
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  return (
    <div className="page-container">
      <Header title="커스텀" showBackIcon={true} />

      <div className="customized-info-list">
        <div className="customized-info">
          <p className="subheading">제목</p>
          <p className="body">{customMessageTemplate?.templateTitle}</p>
        </div>
        <div className="customized-info">
          <p className="subheading">고객</p>
          <div className="customized-info_tag-list">
            {customMessageTemplate?.templateCustomers.map((tag) => (
              <FilledTag
                key={tag.customerId}
                color={tag.customerColor}
                tagName={tag.customerName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <p className="subheading">태그</p>
          <div className="customized-info_tag-list">
            {customMessageTemplate?.templateTags.map((tag) => (
              <BorderTag
                key={tag.tagId}
                color={tag.tagColor}
                tagName={tag.tagName}
              />
            ))}
          </div>
        </div>
        <div className="customized-info">
          <div className="customized-info_message-body">
            {customMessageTemplate?.templateContent}
          </div>
        </div>
      </div>

      <div className="customized-detail_button-group">
        <button
          onClick={handleDelete}
          type="button"
          className="customized-detail_button red_button"
        >
          삭제
        </button>
        <button
          onClick={openAIEditModal}
          type="button"
          className="customized-detail_button blue_button"
        >
          AI로 수정
        </button>
        <button
          onClick={openEditModal}
          type="button"
          className="customized-detail_button blue_button"
        >
          수정하기
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={isAIEdit ? "AI로 수정" : "수정하기"}
        >
          {isAIEdit ? (
            <CustomizedModifyAI
              templateId={id}
              onClose={handleCloseModal}
              onSave={handleSaveTemplate}
            />
          ) : (
            <CustomizedModifyForm
              templateId={id}
              onClose={handleCloseModal}
              onSave={handleSaveTemplate}
            />
          )}
        </Modal>
      )}
    </div>
  );
}