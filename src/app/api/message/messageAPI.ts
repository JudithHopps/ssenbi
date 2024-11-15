import {
  GetEveryMessagesType,
  MessagePostPropsType,
} from "@/types/message/messageTypes";
import axiosInstance from "../axiosInstance";

// Get Every Messages
export const getEveryMessagesAPI = async ({
  token,
  keyword,
  sort,
}: GetEveryMessagesType) => {
  //console.log(keyword, sort);
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axiosInstance.get(`/message`, {
    headers,
    params: {
      sort,
      ...(keyword && { keyword }),
    },
  });
  return response.data;
};

// Get Single Message
export const getMessageAPI = async (messageId: string) => {
  const response = await axiosInstance.get(`/message/${messageId}`);
  return response.data;
};

// Delete Single Message
export const deleteMessageAPI = async (messageId: string) => {
  const response = await axiosInstance.delete(`/message/${messageId}`);
  return response.data;
};

// todo : message 작업 막기
// Post Send Message
export const postSendMessageAPI = async (
  messagePostprops: MessagePostPropsType,
  isTestMode: boolean = true,
) => {
  if (isTestMode) {
    alert(
      "안내: 현재는 테스트 모드입니다.\n개인정보 보호를 위해 실제 고객에게는 메시지가 발송되지 않습니다.\n이 점 참고하시어 테스트를 진행해 주시기 바랍니다.",
    );
    return;
  }
};

// 고객 통계
export const getMessageStatisticsAPI = async (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axiosInstance.get("/message/statistics", {
    headers,
  });

  return response.data;
};
