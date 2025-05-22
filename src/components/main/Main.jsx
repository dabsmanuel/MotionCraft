'use client'
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Settings, Upload, Zap, Download, Share, Edit, Play, ChevronLeft, ChevronRight, Sliders, Music, Clock, Layers, Film } from 'lucide-react';

export default function MotionCraft() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [promptData, setPromptData] = useState({
    motionType: 'zoom',
    animationStyle: 'cinematic',
    duration: 5,
    includeAudio: false,
    audioType: 'none',
    customPrompt: ''
  });
  const [processing, setProcessing] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }
    
    setError(null);
    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle prompt changes
  const handlePromptChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPromptData({
      ...promptData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Process the image to generate video
  const processImage = () => {
    setProcessing(true);
    setError(null);
    
    // Simulate AI processing with timeout
    setTimeout(() => {
      
      const mockVideo = {
        id: Date.now(),
        title: uploadedImage.name.split('.')[0],
        url: imagePreview, 
        thumbnail: imagePreview,
        createdAt: new Date().toISOString(),
        prompt: promptData.customPrompt,
        isVideo: true
      };
      
      setGeneratedVideo(mockVideo);
      setProjects([mockVideo, ...projects]);
      setProcessing(false);
      setCurrentStep(3);
    }, 3000);
  };

  const resetProject = () => {
    setUploadedImage(null);
    setImagePreview(null);
    setPromptData({
      motionType: 'zoom',
      animationStyle: 'cinematic',
      duration: 5,
      includeAudio: false,
      audioType: 'none',
      customPrompt: ''
    });
    setGeneratedVideo(null);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep === 2) {
      processImage();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Head>
        <title>MotionCraft - AI Image to Video Transformation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Transform your images into captivating videos with advanced AI technology" />
      </Head>

      <div className="bg-black min-h-screen text-gray-100">
        <div className="absolute inset-0 opacity-5 bg-grid-pattern pointer-events-none"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-blue-400 mr-2" />
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">MotionCraft AI</h1>
              </div>
              <div className="flex space-x-4">
                <button className="border border-blue-500 bg-opacity-20 bg-blue-900 text-blue-400 px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition">Sign In</button>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">Sign Up</button>
              </div>
            </div>
            <p className="text-gray-400 mt-2">Transform static images into dynamic motion with advanced neural processing</p>
          </header>

          <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6 mb-8 backdrop-blur bg-opacity-95">
            {/* Progress indicator */}
            <div className="relative mb-12">
              <div className="h-1 w-full bg-gray-800 rounded-full">
                <div 
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: (currentStep / 3) * 100 + '%' }}
                ></div>
              </div>
              
              <div className="absolute -top-2 left-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 border-2 border-blue-500 text-blue-400">
                <Upload className="h-4 w-4" />
              </div>
              
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 border-2 border-gray-700 text-gray-400">
                <Settings className={currentStep >= 2 ? "h-4 w-4 text-blue-400" : "h-4 w-4"} />
              </div>
              
              <div className="absolute -top-2 right-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-900 border-2 border-gray-700 text-gray-400">
                <Film className={currentStep >= 3 ? "h-4 w-4 text-blue-400" : "h-4 w-4"} />
              </div>
              
              <div className="absolute top-4 left-0 text-xs text-gray-400">Upload</div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">Configure</div>
              <div className="absolute top-4 right-0 text-xs text-gray-400">Generate</div>
            </div>

            {/* Step 1: Upload Image */}
            {currentStep === 1 && (
              <div className="py-4">
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Upload Your Image</h2>
                
                {error && (
                  <div className="bg-red-900 bg-opacity-20 text-red-400 p-3 rounded-lg mb-6 border border-red-800">
                    {error}
                  </div>
                )}
                
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center mb-8 hover:border-blue-500 transition-colors duration-300 bg-gray-800 bg-opacity-50">
                  {imagePreview ? (
                    <div>
                      <div className="relative h-64 mx-auto mb-4 rounded-lg overflow-hidden">
                        <Image 
                          src={imagePreview} 
                          alt="Preview" 
                          layout="fill" 
                          objectFit="contain"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="text-gray-300 mb-2">{uploadedImage.name}</p>
                        <button 
                          onClick={() => {
                            setUploadedImage(null);
                            setImagePreview(null);
                          }}
                          className="text-red-400 underline hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                      <p className="text-gray-400 mb-4">Drag and drop your image here, or</p>
                      <label className="cursor-pointer inline-block bg-gradient-to-r from-blue-600 to-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                        Select Image
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <p className="mt-4 text-gray-500 text-sm">Supported formats: JPEG, PNG, WebP (max 10MB)</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={nextStep}
                    disabled={!uploadedImage}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center ${uploadedImage ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90' : 'bg-gray-800 text-gray-500 cursor-not-allowed'} transition`}
                  >
                    Next
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Configure Prompt */}
            {currentStep === 2 && (
              <div className="py-4">
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Configure AI Animation
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                    <h3 className="text-gray-300 text-sm mb-2 flex items-center">
                      <Layers className="h-4 w-4 mr-2 text-blue-400" />
                      Source Image
                    </h3>
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image 
                        src={imagePreview} 
                        alt="Selected" 
                        layout="fill" 
                        objectFit="contain" 
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                        <h3 className="text-gray-300 text-sm mb-3 flex items-center">
                          <Film className="h-4 w-4 mr-2 text-blue-400" />
                          Motion Type
                        </h3>
                        <select 
                          name="motionType"
                          value={promptData.motionType}
                          onChange={handlePromptChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="zoom">Zoom</option>
                          <option value="pan">Pan</option>
                          <option value="rotate">Rotate</option>
                          <option value="parallax">Parallax (3D effect)</option>
                          <option value="morph">Morph</option>
                        </select>
                      </div>
                      
                      <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                        <h3 className="text-gray-300 text-sm mb-3 flex items-center">
                          <Sliders className="h-4 w-4 mr-2 text-blue-400" />
                          Animation Style
                        </h3>
                        <select 
                          name="animationStyle"
                          value={promptData.animationStyle}
                          onChange={handlePromptChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="cinematic">Cinematic</option>
                          <option value="realistic">Realistic</option>
                          <option value="artistic">Artistic</option>
                          <option value="cartoon">Cartoon</option>
                          <option value="abstract">Abstract</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                      <h3 className="text-gray-300 text-sm mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-400" />
                        Duration <span className="ml-2 text-blue-400 font-mono">{promptData.duration}s</span>
                      </h3>
                      <input 
                        type="range" 
                        name="duration"
                        min="3" 
                        max="15" 
                        value={promptData.duration}
                        onChange={handlePromptChange}
                        className="w-full accent-blue-500"
                      />
                      <div className="flex justify-between text-gray-500 text-xs mt-1">
                        <span>3s</span>
                        <span>9s</span>
                        <span>15s</span>
                      </div>
                    </div>
                    
                    <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                      <div className="flex items-center mb-3">
                        <Music className="h-4 w-4 mr-2 text-blue-400" />
                        <h3 className="text-gray-300 text-sm">Audio Settings</h3>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <input 
                          type="checkbox" 
                          id="includeAudio"
                          name="includeAudio"
                          checked={promptData.includeAudio}
                          onChange={handlePromptChange}
                          className="h-4 w-4 rounded border-gray-700 text-blue-500 focus:ring-0 focus:ring-offset-0 bg-gray-900"
                        />
                        <label htmlFor="includeAudio" className="ml-2 text-gray-300">Include AI-generated soundtrack</label>
                      </div>
                      
                      {promptData.includeAudio && (
                        <select 
                          name="audioType"
                          value={promptData.audioType}
                          onChange={handlePromptChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="ambient">Ambient</option>
                          <option value="energetic">Energetic</option>
                          <option value="dramatic">Dramatic</option>
                          <option value="happy">Happy</option>
                          <option value="sad">Sad</option>
                        </select>
                      )}
                    </div>
                    
                    <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                      <h3 className="text-gray-300 text-sm mb-3">AI Guidance (Optional)</h3>
                      <textarea 
                        name="customPrompt"
                        value={promptData.customPrompt}
                        onChange={handlePromptChange}
                        placeholder="Provide additional details to guide the AI animation process..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 h-20 text-gray-200 focus:border-blue-500 focus:outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={prevStep}
                    className="px-5 py-2 bg-gray-800 rounded-lg font-medium flex items-center hover:bg-gray-700 transition"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </button>
                  <button 
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium flex items-center hover:opacity-90 transition"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Video
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && (
              <div className="py-4">
                <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Your AI-Generated Video
                </h2>
                
                {processing ? (
                  <div className="text-center py-16">
                    <div className="flex flex-col items-center">
                      <div className="relative h-20 w-20 mb-6">
                        <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin animation-delay-150"></div>
                        <div className="absolute inset-4 border-t-2 border-l-2 border-blue-400 rounded-full animate-spin animation-delay-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-blue-400" />
                        </div>
                      </div>
                      <p className="text-gray-300">Neural processing in progress...</p>
                      <div className="mt-4 h-1 w-64 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-1/2 animate-pulse"></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Our AI is crafting your motion sequence</p>
                    </div>
                  </div>
                ) : generatedVideo ? (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="md:col-span-3 bg-black bg-opacity-60 rounded-xl border border-gray-800 overflow-hidden">
                      <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
                        <div className="absolute inset-0">
                          <Image 
                            src={generatedVideo.thumbnail} 
                            alt="Generated Video Preview" 
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-blue-500 bg-opacity-90 rounded-full p-4 cursor-pointer hover:bg-opacity-100 transition-all transform hover:scale-105">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 p-4">
                        <button className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:opacity-90 transition">
                          <Download className="h-5 w-5 mr-2" />
                          Download
                        </button>
                        <button className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition">
                          <Share className="h-5 w-5 mr-2" />
                          Share
                        </button>
                        <button className="flex items-center justify-center px-4 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition">
                          <Edit className="h-5 w-5 mr-2" />
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      <div className="bg-black bg-opacity-40 p-4 rounded-xl border border-gray-800">
                        <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">Animation Parameters</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Motion Type</p>
                            <p className="font-medium text-gray-200">{promptData.motionType}</p>
                          </div>
                          <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Style</p>
                            <p className="font-medium text-gray-200">{promptData.animationStyle}</p>
                          </div>
                          <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Duration</p>
                            <p className="font-medium text-gray-200">{promptData.duration} seconds</p>
                          </div>
                          <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">Audio</p>
                            <p className="font-medium text-gray-200">{promptData.includeAudio ? promptData.audioType : 'None'}</p>
                          </div>
                        </div>
                        
                        {promptData.customPrompt && (
                          <div className="mt-4 bg-gray-900 bg-opacity-60 p-3 rounded-lg">
                            <p className="text-gray-500 text-xs mb-1">AI Guidance</p>
                            <p className="italic text-gray-300 text-sm">{promptData.customPrompt}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-blue-900 bg-opacity-20 border border-blue-800 p-4 rounded-xl">
                        <h3 className="flex items-center text-blue-400 font-medium mb-2">
                          <Zap className="h-4 w-4 mr-2" />
                          AI Enhancement
                        </h3>
                        <p className="text-gray-300 text-sm">Try our advanced options to further enhance your video with AI-powered effects and stabilization.</p>
                        <button className="mt-3 w-full bg-blue-600 py-2 rounded-lg text-white font-medium hover:bg-blue-500 transition">
                          Upgrade Video
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400">Something went wrong. Please try again.</p>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={resetProject}
                    className="px-6 py-3 bg-gray-800 rounded-lg font-medium hover:bg-gray-700 transition"
                  >
                    New Project
                  </button>
                </div>
              </div>
            )}
          </div>

          {projects.length > 0 && (
            <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg p-6 backdrop-blur bg-opacity-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Your Projects</h2>
                <button className="text-sm text-gray-400 hover:text-white transition">View All</button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="group bg-black bg-opacity-40 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all transform hover:-translate-y-1">
                    <div className="relative pt-[56.25%] bg-gray-900">
                      <Image 
                        src={project.thumbnail} 
                        alt={project.title} 
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-blue-500 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      {project.isVideo && (
                        <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                          <Film className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-200 truncate">{project.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}