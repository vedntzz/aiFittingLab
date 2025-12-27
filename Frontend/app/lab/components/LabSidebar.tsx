'use client';

import { useState } from 'react';
import { useLabStore } from '@/stores/useLabStore';
import { Garment } from '@/types';

export default function LabSidebar() {
  const {
    userImage,
    garments,
    setUserImage,
    addGarment,
    removeGarment,
    setIsGenerating,
    setGeneratedImage,
  } = useLabStore();

  const [productUrls, setProductUrls] = useState({
    top: '',
    bottom: '',
    footwear: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGarment = (type: 'top' | 'bottom' | 'footwear') => {
    const url = productUrls[type];
    if (url) {
      const garment: Garment = {
        id: `${type}-${Date.now()}`,
        type,
        imageUrl: url,
        productUrl: url,
      };
      addGarment(garment);
      setProductUrls((prev) => ({ ...prev, [type]: '' }));
    }
  };

  const handleGenerate = async () => {
    if (!userImage || garments.length === 0) {
      alert('Please upload an image and add at least one garment');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedImage('generated-placeholder');
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <aside className="w-[400px] bg-paper border-r border-stone/30 overflow-y-auto">
      <div className="p-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-italiana text-3xl mb-2">AI Fitting Lab</h1>
          <p className="text-sm text-ink/60 font-grotesk">
            Virtual try-on powered by neural networks
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <h3 className="font-grotesk text-[11px] uppercase tracking-wider text-ink/60 mb-4">
            Upload Photograph
          </h3>
          <label
            className={`block h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              userImage
                ? 'border-copper bg-sage/10'
                : 'border-stone hover:border-copper hover:bg-canvas'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="h-full flex flex-col items-center justify-center">
              {userImage ? (
                <>
                  <span className="text-3xl mb-3">✓</span>
                  <span className="text-sm font-grotesk">Image uploaded</span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full border-2 border-ink/20 mb-3 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0.5 h-3.5 bg-ink/20" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3.5 h-0.5 bg-ink/20" />
                    </div>
                  </div>
                  <span className="text-sm font-grotesk text-ink/60">
                    Select or drop image
                  </span>
                </>
              )}
            </div>
          </label>
        </div>

        {/* Garment Inputs */}
        <div className="mb-12">
          <h3 className="font-grotesk text-[11px] uppercase tracking-wider text-ink/60 mb-4">
            Product References
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={productUrls.top}
                onChange={(e) =>
                  setProductUrls((prev) => ({ ...prev, top: e.target.value }))
                }
                placeholder="Top garment URL"
                className="input-field flex-1"
              />
              <button
                onClick={() => handleAddGarment('top')}
                className="px-4 py-2 bg-canvas rounded-lg hover:bg-stone/50 transition-colors"
              >
                +
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={productUrls.bottom}
                onChange={(e) =>
                  setProductUrls((prev) => ({ ...prev, bottom: e.target.value }))
                }
                placeholder="Bottom garment URL"
                className="input-field flex-1"
              />
              <button
                onClick={() => handleAddGarment('bottom')}
                className="px-4 py-2 bg-canvas rounded-lg hover:bg-stone/50 transition-colors"
              >
                +
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={productUrls.footwear}
                onChange={(e) =>
                  setProductUrls((prev) => ({ ...prev, footwear: e.target.value }))
                }
                placeholder="Footwear URL"
                className="input-field flex-1"
              />
              <button
                onClick={() => handleAddGarment('footwear')}
                className="px-4 py-2 bg-canvas rounded-lg hover:bg-stone/50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Added Garments */}
          {garments.length > 0 && (
            <div className="mt-4 space-y-2">
              {garments.map((garment) => (
                <div
                  key={garment.id}
                  className="flex items-center justify-between p-3 bg-canvas rounded-lg"
                >
                  <span className="text-sm font-grotesk capitalize">
                    {garment.type}
                  </span>
                  <button
                    onClick={() => removeGarment(garment.id)}
                    className="text-rose hover:text-rose/70"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} className="btn-primary w-full">
          Generate Look
        </button>
      </div>
    </aside>
  );
}
