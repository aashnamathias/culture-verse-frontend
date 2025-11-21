// @ts-ignore
import * as tmImage from '@teachablemachine/image';

let model: any = null;

// 1. Load the Model (Cached)
export const loadModel = async () => {
  if (model) return model;

  try {
    const modelURL = "/model/model.json";
    const metadataURL = "/model/metadata.json";

    console.log("Loading AI Model...");
    model = await tmImage.load(modelURL, metadataURL);
    console.log("✅ AI Model Ready");
    return model;
  } catch (err) {
    console.error("❌ Failed to load model:", err);
    return null;
  }
};

// 2. Predict Image
export const classifyImage = async (imageElement: HTMLImageElement) => {
  if (!model) await loadModel();
  if (!model) return null;

  // Run prediction
  const prediction = await model.predict(imageElement);

  let highestProb = 0;
  let bestLabel = "";

  prediction.forEach((p: any) => {
    if (p.probability > highestProb) {
      highestProb = p.probability;
      bestLabel = p.className;
    }
  });

  // Log for debugging (Press F12 to see confidence)
  console.log(`AI sees: ${bestLabel} (${(highestProb * 100).toFixed(0)}%)`);

  // THRESHOLD: Accept match if > 45% confidence (Faster detection)
  if (highestProb < 0.60) return null;

  // Map exact labels from Teachable Machine to App IDs
  switch (bestLabel) {
    case "Channapatna Toys": return "channapatna";
    case "Jaipur Blue Pottery": return "blue-pottery";
    case "Warli Art": return "warli";
    case "Kolam Art": return "kolam";
    case "Madhubani Art": return "madhubani";
    case "Background": return null; 
    default: return null;
  }
};