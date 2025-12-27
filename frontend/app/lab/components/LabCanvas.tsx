'use client';

import { useRouter } from 'next/navigation';
import { useLabStore } from '@/stores/useLabStore';

export default function LabCanvas() {
  const router = useRouter();
  const { generatedImage, isGenerating, reset } = useLabStore();

  const handleSaveDraft = () => {
    // TODO: Implement save to drafts
    alert('Saved to drafts!');
  };

  const handlePublish = () => {
    // TODO: Implement publish to wall
    alert('Published to wall!');
    reset();
    router.push('/wall');
  };

  return (
    <main className="flex-1 flex items-center justify-center p-12 relative">
      {/* Canvas Frame */}
      <div className="w-full max-w-2xl h-[80vh] bg-paper border border-stone/30 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
        {isGenerating ? (
          // Loading State
          <div className="text-center animate-fade-in">
            <div className="w-12 h-12 border-2 border-stone border-t-copper rounded-full animate-spin mx-auto mb-6" />
            <h3 className="font-italiana text-2xl mb-2">Processing</h3>
            <p className="text-sm text-ink/60 font-grotesk uppercase tracking-wider">
              Creating your look
            </p>
          </div>
        ) : generatedImage ? (
          // Generated Result
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose/10 via-lavender/10 to-sage/10 animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-copper flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="font-italiana text-2xl mb-2">Look Generated</h3>
              <p className="text-sm text-ink/60 font-grotesk">
                Your AI-generated outfit is ready
              </p>
            </div>
          </div>
        ) : (
          // Placeholder
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-stone/30 relative">
              <div className="absolute inset-4 rounded-full border-2 border-stone/20" />
            </div>
            <p className="font-editorial text-xl text-silk italic">
              Awaiting input
            </p>
          </div>
        )}

        {/* Controls */}
        {generatedImage && !isGenerating && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 glass px-6 py-4 rounded-xl border border-stone/30 animate-fade-in">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2.5 border border-stone rounded-lg font-grotesk text-sm hover:border-copper hover:bg-canvas transition-all"
            >
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              className="px-6 py-2.5 bg-ink text-paper rounded-lg font-grotesk text-sm hover:bg-copper transition-all"
            >
              Publish to Wall
            </button>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-ocean/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-plum/5 blur-[100px] pointer-events-none -z-10" />
    </main>
  );
}
