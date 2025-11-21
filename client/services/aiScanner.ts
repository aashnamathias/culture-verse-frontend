// @ts-ignore
import * as tmImage from '@teachablemachine/image';

let model: any = null;

export const loadModel = async () => {
  if (model) return model;

  try {
    // This looks for the public folder at root
    const modelURL = "/model/model.json";
    const metadataURL = "/model/metadata.json";

    console.log("Loading model...");
    model = await tmImage.load(modelURL, metadataURL);
    console.log("✅ AI Model Loaded");
    return model;
  } catch (err) {
    console.error("❌ Failed to load model. Did you npm install @teachablemachine/image?", err);
    return null;
  }
};

export const classifyImage = async (imageElement: HTMLImageElement) => {
  if (!model) await loadModel();
  if (!model) return null; // Logic fails safely if model missing

  const prediction = await model.predict(imageElement);

  let highestProb = 0;
  let bestLabel = "";

  prediction.forEach((p: any) => {
    if (p.probability > highestProb) {
      highestProb = p.probability;
      bestLabel = p.className;
    }
  });

  console.log(`AI Predicted: ${bestLabel}`);

  // Map exact Teachable Machine labels to your Route IDs
  switch (bestLabel) {
    case "Channapatna Toys": return "channapatna";
    case "Jaipur Blue Pottery": return "blue-pottery";
    case "Warli Art": return "warli";
    case "Kolam Art": return "kolam";
    case "Madhubani Art": return "madhubani";
    case "Background": return null;
    default: return "channapatna"; // Fallback for demo purposes
  }
};