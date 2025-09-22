import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Utility to convert data URL to base64 and mimeType
const parseDataUrl = (dataUrl: string): { base64: string, mimeType: string } => {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Định dạng URL dữ liệu không hợp lệ");
  }
  return { mimeType: match[1], base64: match[2] };
};

export const generateAvatarImage = async (prompt: string): Promise<{ base64: string, mimeType: string }> => {
  const detailedPrompt = `
    Tạo một ảnh đại diện chân thực, 4K, siêu nét, độ nét cao dựa trên mô tả này: "${prompt}".
    Ảnh đại diện nên là ảnh chụp toàn thân hoặc nửa thân trên của một người duy nhất.
    Nền nên trung tính và đơn giản (như màu xám hoặc trắng đồng nhất) để dễ dàng tách người ra khỏi nền.
    Không bao gồm bất kỳ văn bản hoặc hình mờ nào.
    Đầu ra cuối cùng chỉ được là hình ảnh.
  `;
  
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: detailedPrompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '1:1',
    },
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return {
      base64: base64ImageBytes,
      mimeType: 'image/png',
    };
  }
  
  throw new Error("AI không thể tạo ảnh đại diện. Vui lòng thử một mô tả khác.");
};


export const generateTravelImage = async (
  originalImageDataUrl: string,
  originalMimeType: string,
  destinationPrompt: string
): Promise<{ base64: string, mimeType: string }> => {
  const { base64: originalImageBase64 } = parseDataUrl(originalImageDataUrl);

  const model = 'gemini-2.5-flash-image-preview';

  const prompt = `
    Lấy người chính từ hình ảnh do người dùng cung cấp và đặt họ một cách chân thực vào bối cảnh sau: "${destinationPrompt}".
    Đầu ra cuối cùng PHẢI là một hình ảnh chân thực, độ phân giải 4K, siêu nét, độ nét cao.
    Hãy chú ý kỹ đến ánh sáng, bóng tối và phối cảnh để bố cục liền mạch và đáng tin cậy.
    Không bao gồm bất kỳ văn bản hoặc hình mờ nào.
    Đầu ra chỉ nên là hình ảnh cuối cùng.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        {
          inlineData: {
            data: originalImageBase64,
            mimeType: originalMimeType,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      // The model requires both IMAGE and TEXT modalities in the response
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  // Find the image part in the response
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return {
        base64: part.inlineData.data,
        mimeType: part.inlineData.mimeType,
      };
    }
  }

  throw new Error("AI không trả về hình ảnh. Vui lòng thử một ảnh hoặc điểm đến khác.");
};