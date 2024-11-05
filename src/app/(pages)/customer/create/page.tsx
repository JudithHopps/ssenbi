"use client";

import "../layout.css";
import InputField from "@/app/components/common/input/InputField";
import TagList from "@/app/components/common/tag/TagList";
import Header from "@/app/components/layout/Header";
import { CustomerType, TagType } from "@/types/tag/tagTypes";
import { ChangeEvent, useState } from "react";

type CustomerCreationType = Omit<CustomerType, "customerId" | "customerColor">;

export default function CustomerCreatePage() {
  const [customer, setCustomer] = useState<CustomerCreationType>({
    customerName: "",
    customerPhoneNumber: "",
    customerTags: [],
  });
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      customerName: e.target.value,
    });
  };
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      customerPhoneNumber: e.target.value,
    });
  };
  const handleTagChange = (tags: TagType[]) => {
    setCustomer({
      ...customer,
      customerTags: tags,
    });
  };

  return (
    <div className="page-container">
      <Header title="새 고객 추가" showBackIcon />
      <InputField
        type="text"
        onChange={handleNameChange}
        label="이름"
        value={customer.customerName}
        maxLength={20}
      />
      <InputField
        type="text"
        onChange={handlePhoneNumberChange}
        label="전화번호"
        value={customer.customerPhoneNumber || ""}
        maxLength={13}
      />
      <div className="field-wrapper">
        <label className="label">태그</label>
        <TagList tags={customer.customerTags} setTags={handleTagChange} />
      </div>
      <div className="field-wrapper">
        {/* TODO: 메모 추가 */}
        <label className="label">메모</label>
        <textarea className="body memo" />
      </div>
    </div>
  );
}