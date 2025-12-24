
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


let selectedModel = null;

export const callGemini = async (prompt, systemInstruction = "") => {
  
  if (!apiKey) {
    alert("API Key Missing! Please check your .env file.");
    return "Error: API Key missing.";
  }

  try {
    
    if (!selectedModel) {
      console.log("🔍 Checking available models for your Key...");
      
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listResponse = await fetch(listUrl);
      const listData = await listResponse.json();

      if (!listResponse.ok) {
        throw new Error(`Model List Failed: ${listData.error?.message}`);
      }

    
      const validModels = listData.models.filter(m => 
        m.supportedGenerationMethods.includes("generateContent") &&
        !m.name.includes("exp") 
      );

      // Prefer: Flash ya Pro
      const bestModel = validModels.find(m => m.name.includes("flash")) || 
                        validModels.find(m => m.name.includes("pro")) || 
                        validModels[0]; 

      if (!bestModel) {
        throw new Error("No valid models found for this API Key.");
      }

    
      selectedModel = bestModel.name.replace("models/", "");
      console.log("✅ Auto-Selected Working Model:", selectedModel);
    }

    
  
  
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;
    
    const finalPrompt = systemInstruction 
      ? `System: ${systemInstruction}\n\nUser: ${prompt}` 
      : prompt;

    const payload = {
      contents: [{ parts: [{ text: finalPrompt }] }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("API Error:", data);
        // Agar selected model fail ho jaye (e.g. 429 quota), to cache clear karo
        selectedModel = null;
        const errorMsg = data.error?.message || "Unknown Error";
        alert(`Error: ${errorMsg}`);
        return `Error: ${errorMsg}`;
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";

  } catch (error) {
    console.error("Critical Error:", error);
    alert(`Connection Error: ${error.message}`);
    return "Network connection failed.";
  }
};