import { useState, useRef, useCallback, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles, Eye, Archive, Camera, Image as ImageIcon, X, Repeat, Hammer, BookOpen, MapPin, ArrowLeft } from "lucide-react";
import Webcam from "react-webcam";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Index() {
  // State to hold the selected image file
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // State to manage if camera view is active
  const [showCamera, setShowCamera] = useState(false);
  // State to manage if the results view should be shown
  const [showResults, setShowResults] = useState(false);
  // State to show image preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Refs for hidden input and webcam controller
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  // --- Handlers for File Upload ---

  // Trigger hidden file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // --- Handlers for Camera ---

  // Capture photo from webcam
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
        // Convert base64 data URL to a File object
        fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
            processFile(file);
            setShowCamera(false); // Turn off camera view
            setShowResults(true); // Show the results view
        });
    }
  }, [webcamRef]);

  // Common function to process loaded file and set preview
  const processFile = (file: File) => {
    setSelectedImage(file);
    // Create a temporary URL for previewing the image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Reset state to start over
  const clearSelection = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setShowCamera(false);
    setShowResults(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  return (
    // Outer container is h-screen (100vh) with dark mode background support
    <div className="h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col overflow-hidden transition-colors duration-300">
      {/* Hidden Input for File Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      {/* Header - ALWAYS VISIBLE, with dark mode styles and Toggle */}
      <header className="flex items-center justify-between px-8 py-3 border-b border-border/30 flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-20 relative transition-colors duration-300">
        <div className="text-lg font-semibold tracking-wide text-foreground font-serif">
          CultureVerse Lens
        </div>
        <nav className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Demo
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Archive
          </a>
          <ModeToggle />
        </nav>
      </header>

      {/* Main Content Area - Fills remaining height (`flex-1`) between header and bottom */}
      <div className={`flex-1 flex flex-col items-center ${showCamera ? 'justify-start p-0 overflow-hidden relative' : 'justify-between px-6 py-8 overflow-auto'}`}>
        {/* Hero Section - Hide when camera or results are active */}
        {!showCamera && !showResults && (
          <div className="text-center max-w-4xl flex-shrink-0 mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3 tracking-wide">
              CultureVerse Lens
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide">
              AI + AR platform that brings local crafts and traditions to life.
            </p>
          </div>
        )}

        {/* Main Functional Card/Area */}
        <div className={`w-full flex-shrink-0 ${showCamera ? 'flex-1 flex flex-col h-full' : 'max-w-xl mb-auto'}`}>
          {/* The Card itself. With dark mode styles */}
          <div className={`glass soft-shadow w-full backdrop-blur-lg bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/60 shadow-xl transition-all duration-300 flex flex-col items-center ${showCamera ? 'h-full rounded-none border-0 bg-black dark:bg-black' : 'rounded-2xl p-8'}`}>
            {/* Hide title when camera or results are active */}
            {!showCamera && !showResults && (
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
                Upload or Scan
              </h2>
            )}

            {/* CONDITIONAL RENDERING BASED ON STATE */}

            {showCamera ? (
              // --- VIEW 1: CAMERA ACTIVE (FITS PERFECTLY BETWEEN HEADER AND BOTTOM) ---
              <div className="flex flex-col items-center w-full h-full relative overflow-hidden">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    // Prefer rear camera on phones
                    videoConstraints={{ facingMode: "environment" }}
                    // Inline styles to force full coverage without distortion
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                {/* Overlay controls on top of the camera view - Added z-10 to ensure visibility */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8 px-8 py-8 items-center bg-gradient-to-t from-black/60 to-transparent pb-safe z-10">
                  <Button variant="secondary" size="lg" className="bg-white/80 hover:bg-white backdrop-blur-md px-8" onClick={() => setShowCamera(false)}>
                    Cancel
                  </Button>
                  <button className="bg-white rounded-full p-1 shadow-lg transition-transform hover:scale-105 active:scale-95" onClick={capturePhoto}>
                      <div className="bg-amber-500 rounded-full p-4">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                  </button>
                  {/* Spacer to balance the layout on larger screens */}
                  <div className="w-[100px] hidden sm:block"></div>
                </div>
              </div>

            ) : showResults && previewUrl ? (
              // --- VIEW 4: RESULTS OPTIONS (AFTER CAPTURE/IDENTIFY) ---
              <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-6 text-center">
                    Craft Identified
                  </h2>
                  {/* Display the captured/uploaded image */}
                  <div className="mb-8 relative rounded-xl overflow-hidden border-2 border-border/50 bg-secondary/30 h-64 w-full flex items-center justify-center shadow-sm">
                      <img src={previewUrl} alt="Identified Craft" className="w-full h-full object-contain" />
                  </div>

                  {/* The three new options with dark mode styling */}
                  <div className="grid grid-cols-1 gap-4 w-full mb-8">
                      {/* Button 1: Craftsmanship & Technique */}
                      <Button
                        className="w-full justify-start text-lg h-auto py-4 px-6 bg-white dark:bg-slate-950 text-foreground border border-amber-200/50 dark:border-slate-700 shadow-sm group transition-all hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/80 dark:hover:bg-slate-900"
                        variant="outline"
                      >
                          <div className="bg-amber-100 dark:bg-slate-800 p-2 rounded-full mr-4 group-hover:bg-amber-200 dark:group-hover:bg-slate-700 transition-colors">
                            <Hammer className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Craftsmanship & Technique</div>
                            <div className="text-sm text-muted-foreground font-normal group-hover:text-black/70 dark:group-hover:text-white/70">How it is made</div>
                          </div>
                      </Button>

                      {/* Button 2: Symbolism & History */}
                      <Button
                        className="w-full justify-start text-lg h-auto py-4 px-6 bg-white dark:bg-slate-950 text-foreground border border-amber-200/50 dark:border-slate-700 shadow-sm group transition-all hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/80 dark:hover:bg-slate-900"
                        variant="outline"
                      >
                          <div className="bg-amber-100 dark:bg-slate-800 p-2 rounded-full mr-4 group-hover:bg-amber-200 dark:group-hover:bg-slate-700 transition-colors">
                            <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Symbolism & History</div>
                            <div className="text-sm text-muted-foreground font-normal group-hover:text-black/70 dark:group-hover:text-white/70">Its meaning and origins</div>
                          </div>
                      </Button>

                      {/* Button 3: Regional Styles */}
                      <Button
                        className="w-full justify-start text-lg h-auto py-4 px-6 bg-white dark:bg-slate-950 text-foreground border border-amber-200/50 dark:border-slate-700 shadow-sm group transition-all hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/80 dark:hover:bg-slate-900"
                        variant="outline"
                      >
                          <div className="bg-amber-100 dark:bg-slate-800 p-2 rounded-full mr-4 group-hover:bg-amber-200 dark:group-hover:bg-slate-700 transition-colors">
                            <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold">Regional Styles</div>
                            <div className="text-sm text-muted-foreground font-normal group-hover:text-black/70 dark:group-hover:text-white/70">Variations across regions</div>
                          </div>
                      </Button>
                  </div>

                  {/* Start Over button */}
                  <Button variant="ghost" onClick={clearSelection} className="text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Scan Another Craft
                  </Button>
              </div>

            ) : previewUrl ? (
               // --- VIEW 2: IMAGE SELECTED (PREVIEW BEFORE IDENTIFY) ---
               <div className="mb-6 relative rounded-xl overflow-hidden border-2 border-border/50 bg-secondary/30 h-64 w-full flex items-center justify-center group">
                  <img src={previewUrl} alt="Selected" className="w-full h-full object-contain" />
                  {/* Overlay to remove/change */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                       <Button size="sm" variant="destructive" onClick={clearSelection}>
                           <X className="w-4 h-4 mr-1" /> Remove
                       </Button>
                  </div>
               </div>

            ) : (
              // --- VIEW 3: INITIAL SELECTION STATE ---
              <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                {/* Left Side - Drop Image */}
                {/* Added dark mode hover states */}
                <div
                  onClick={handleUploadClick}
                  className="border-2 border-dashed border-muted rounded-xl p-4 bg-secondary/30 dark:bg-secondary/10 flex flex-col items-center justify-center h-48 transition-all hover:bg-secondary/50 dark:hover:bg-secondary/20 hover:border-amber-400/50 dark:hover:border-amber-600/50 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-amber-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ImageIcon
                      className="w-6 h-6 text-amber-600 dark:text-amber-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm text-foreground font-medium">
                    Upload Image
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    JPG, PNG or JPEG
                  </p>
                </div>

                {/* Right Side - Use Camera */}
                 {/* Added dark mode hover states */}
                <div
                  onClick={() => setShowCamera(true)}
                  className="border-2 border-dashed border-muted rounded-xl p-4 bg-secondary/30 dark:bg-secondary/10 flex flex-col items-center justify-center h-48 transition-all hover:bg-secondary/50 dark:hover:bg-secondary/20 hover:border-amber-400/50 dark:hover:border-amber-600/50 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-amber-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera
                      className="w-6 h-6 text-amber-600 dark:text-amber-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <p className="text-sm text-foreground font-medium">
                    Use Camera
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    Take a photo
                  </p>
                </div>
              </div>
            )}

            {/* Buttons (Hidden when camera or results are active) */}
            {!showCamera && !showResults && (
              <div className="space-y-3 w-full">
                <Button
                  // Dynamic styling based on if image is selected
                  className={`w-full font-semibold py-3 text-base rounded-xl transition-all duration-200 ${
                    selectedImage
                      ? "bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white hover:shadow-lg hover:scale-[1.02]"
                      : "bg-muted text-muted-foreground opacity-70 cursor-not-allowed"
                  }`}
                  size="lg"
                  // Disable if no image selected
                  disabled={!selectedImage}
                  onClick={() => {
                      if(selectedImage) {
                          // Simulate successful identification and show results
                          setShowResults(true);
                      }
                  }}
                >
                  Identify Craft
                </Button>
                {!selectedImage && (
                   <Button
                   variant="ghost"
                   className="w-full border border-foreground/20 text-foreground hover:bg-foreground/5 py-3 text-base rounded-xl font-medium transition-all duration-200"
                   size="lg"
                 >
                   Try Demo
                 </Button>
                )}
               {selectedImage && (
                    <Button variant="ghost" size="sm" onClick={clearSelection} className="w-full text-muted-foreground hover:text-destructive">
                        <Repeat className="w-3 h-3 mr-1" /> Start Over
                    </Button>
               )}
              </div>
            )}

            {/* Helper Text */}
            {!showCamera && !selectedImage && !showResults && (
                <p className="text-xs text-muted-foreground text-center mt-4 font-light tracking-tight">
                AI-powered cultural recognition • No signup required
                </p>
            )}
          </div>
        </div>

        {/* Features Row */}
        {!showCamera && !showResults && (
          <div className="grid grid-cols-3 gap-8 w-full max-w-3xl flex-shrink-0 mt-8 pb-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-500" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-foreground">
                AI Recognition
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                <Eye className="w-6 h-6 text-amber-600 dark:text-amber-500" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-foreground">
                AR Story Overlay
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-amber-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                <Archive className="w-6 h-6 text-amber-600 dark:text-amber-500" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-foreground">
                Community Archive
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}