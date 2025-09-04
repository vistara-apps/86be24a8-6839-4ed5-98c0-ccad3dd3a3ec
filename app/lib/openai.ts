import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateAdVariations(imageUrl: string, count: number) {
  try {
    const variations = [];
    
    for (let i = 0; i < count; i++) {
      // Generate ad copy variation
      const copyResponse = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'user',
            content: `Create a compelling social media ad caption for this product. Make it unique, engaging, and focused on benefits. Keep it under 100 characters. Variation ${i + 1}:`
          }
        ],
        max_tokens: 100,
      });

      const caption = copyResponse.choices[0]?.message?.content || `Amazing product variation ${i + 1}! 🔥`;
      
      // For this demo, we'll simulate image variations
      // In a real implementation, you'd use OpenAI's image generation API
      const promptUsed = `Product ad variation ${i + 1} with dynamic background and engaging text overlay`;
      
      variations.push({
        imageUrl: imageUrl, // In real app, this would be the generated variation
        caption: caption.trim(),
        promptUsed,
        createdAt: new Date().toISOString(),
      });
    }
    
    return variations;
  } catch (error) {
    console.error('OpenAI generation failed:', error);
    throw error;
  }
}

export async function generateImageVariation(imageUrl: string, prompt: string) {
  try {
    // In a real implementation with DALL-E or similar:
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${prompt}. Product advertisement style, professional lighting, marketing focused.`,
      n: 1,
      size: "1024x1024",
    });

    return response.data[0]?.url;
  } catch (error) {
    console.error('Image generation failed:', error);
    // Fallback to original image for demo
    return imageUrl;
  }
}
