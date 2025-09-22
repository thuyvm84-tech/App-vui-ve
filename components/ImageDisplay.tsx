import React from 'react';

interface ImageDisplayProps {
  originalImage: string | null;
  finalImage: string | null;
  isLoading: boolean;
}

const Placeholder: React.FC = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-gray-600 rounded-lg p-8">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 className="text-lg font-semibold">Tuyệt tác của bạn đang chờ</h3>
    <p className="text-sm">Ảnh du lịch được tạo của bạn sẽ xuất hiện ở đây.</p>
  </div>
);

const LoadingDisplay: React.FC = () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-400 border-2 border-dashed border-cyan-500/50 rounded-lg p-8 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m8.66-15.66l-.7.7M4.04 19.96l-.7.7M21 12h-1M4 12H3m15.66 8.66l-.7-.7M4.04 4.04l-.7-.7" />
        </svg>
        <h3 className="text-lg font-semibold text-white">Đang tạo cuộc phiêu lưu của bạn...</h3>
        <p className="text-sm">Việc này có thể mất một chút thời gian. AI đang thực hiện phép màu của mình!</p>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, finalImage, isLoading }) => {
  const handleDownload = () => {
    if (!finalImage) return;
    const link = document.createElement('a');
    link.href = finalImage;
    link.download = 'ai-travel-photo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!finalImage) return;

    try {
      const response = await fetch(finalImage);
      const blob = await response.blob();
      const file = new File([blob], 'ai-travel-photo.png', { type: blob.type });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Vu Minh Thuy - Chuyến Đi Trong Mơ!',
          text: 'Hãy xem bức ảnh du lịch tuyệt vời mà tôi đã tạo ra bằng AI!',
          files: [file],
        });
      } else {
        alert('Trình duyệt của bạn không hỗ trợ chia sẻ tệp hoặc API Chia sẻ Web không khả dụng.');
      }
    } catch (error) {
        if ((error as Error).name !== 'AbortError') {
            console.error('Lỗi khi chia sẻ:', error);
            alert('Đã xảy ra lỗi khi cố gắng chia sẻ hình ảnh.');
        }
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center relative">
        {isLoading && <LoadingDisplay />}
        {!isLoading && !finalImage && <Placeholder />}
        {finalImage && !isLoading && (
          <img src={finalImage} alt="Ảnh du lịch đã tạo" className="w-full h-full object-cover animate-kenburns" />
        )}
      </div>
      {finalImage && !isLoading && (
        <div className="w-full grid grid-cols-2 gap-4">
          <button
            onClick={handleDownload}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg"
          >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Tải xuống
          </button>
          <button
            onClick={handleShare}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Chia sẻ
          </button>
        </div>
      )}
      {originalImage && !finalImage && !isLoading && (
         <div className="w-full p-2 bg-gray-700 rounded-md animate-fade-in">
            <p className="text-xs text-center text-gray-400 mb-2">Xem trước ảnh đại diện</p>
            <img src={originalImage} alt="Ảnh đại diện gốc" className="w-full h-auto object-contain rounded" style={{maxHeight: '100px'}}/>
         </div>
      )}
    </div>
  );
};