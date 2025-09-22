import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { DestinationSelector } from './components/DestinationSelector';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { generateTravelImage, generateAvatarImage } from './services/geminiService';
import { Destination, DESTINATIONS } from './constants';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalMimeType, setOriginalMimeType] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination>(DESTINATIONS[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // New state for avatar generation
  const [avatarSource, setAvatarSource] = useState<'upload' | 'generate'>('upload');
  const [avatarPrompt, setAvatarPrompt] = useState<string>('');
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState<boolean>(false);

  const handleImageUpload = (file: File) => {
    setAvatarPrompt(''); // Reset prompt if user decides to upload
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage(reader.result as string);
      setOriginalMimeType(file.type);
      setFinalImage(null);
      setError(null);
    };
    reader.onerror = () => {
        setError("Không thể đọc tệp hình ảnh. Vui lòng thử lại.");
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerateAvatar = async () => {
    if (!avatarPrompt) {
      setError("Vui lòng nhập mô tả cho ảnh đại diện.");
      return;
    }
    
    setIsGeneratingAvatar(true);
    setError(null);
    setFinalImage(null);
    setOriginalImage(null);

    try {
      const { base64, mimeType } = await generateAvatarImage(avatarPrompt);
      const imageDataUrl = `data:${mimeType};base64,${base64}`;
      setOriginalImage(imageDataUrl);
      setOriginalMimeType(mimeType);
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi tạo ảnh đại diện. Vui lòng thử lại.");
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !originalMimeType) {
      setError("Vui lòng tải lên hoặc tạo ảnh đại diện trước.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setFinalImage(null);

    try {
      const { base64: imageBase64, mimeType: imageMimeType } = await generateTravelImage(originalImage, originalMimeType, selectedDestination.prompt);
      setFinalImage(`data:${imageMimeType};base64,${imageBase64}`);
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi tạo ảnh du lịch của bạn. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, originalMimeType, selectedDestination]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Controls */}
            <div className="flex flex-col space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-3">1. Chọn hoặc Tạo Ảnh Đại Diện</h2>
                <div className="flex border-b border-gray-700 mb-4">
                  <button onClick={() => setAvatarSource('upload')} className={`py-2 px-4 font-semibold transition-colors duration-300 ${avatarSource === 'upload' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}>Tải Lên</button>
                  <button onClick={() => setAvatarSource('generate')} className={`py-2 px-4 font-semibold transition-colors duration-300 ${avatarSource === 'generate' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}>Tạo Bằng AI</button>
                </div>
                {avatarSource === 'upload' ? (
                  <>
                    <p className="text-gray-400 mb-4">Tải lên một bức ảnh rõ nét của một người. AI của chúng tôi sẽ lo phần còn lại.</p>
                    <ImageUploader onImageUpload={handleImageUpload} />
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-400">Mô tả ảnh đại diện bạn muốn tạo. Ví dụ: "người đàn ông trẻ tóc nâu, đeo kính, đang cười".</p>
                    <textarea value={avatarPrompt} onChange={(e) => setAvatarPrompt(e.target.value)} placeholder="Mô tả ảnh đại diện..." className="w-full bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-3" rows={3}/>
                    <button onClick={handleGenerateAvatar} disabled={!avatarPrompt || isGeneratingAvatar} className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center text-md">
                      {isGeneratingAvatar ? ( <> <Loader /> <span>Đang tạo ảnh đại diện...</span> </> ) : 'Tạo Ảnh Đại Diện'}
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-3">2. Chọn một điểm đến</h2>
                <p className="text-gray-400 mb-4">Chọn nơi bạn muốn đến. Khả năng là vô tận!</p>
                <DestinationSelector
                  destinations={DESTINATIONS}
                  selectedDestination={selectedDestination}
                  onSelectDestination={setSelectedDestination}
                />
              </div>
              <button
                onClick={handleGenerateClick}
                disabled={!originalImage || isLoading || isGeneratingAvatar}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg flex items-center justify-center text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    <span>Đang tạo phép màu...</span>
                  </>
                ) : (
                  '✨ Tạo ảnh du lịch'
                )}
              </button>
            </div>

            {/* Right Column: Display */}
            <div className="bg-gray-900 p-4 rounded-lg min-h-[400px] flex flex-col justify-center items-center">
              {error && <p className="text-red-400 text-center mb-4">{error}</p>}
              <ImageDisplay
                originalImage={originalImage}
                finalImage={finalImage}
                isLoading={isLoading || isGeneratingAvatar}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Được cung cấp bởi Google Gemini. Được tạo ra bằng cả trái tim.</p>
      </footer>
    </div>
  );
};

export default App;