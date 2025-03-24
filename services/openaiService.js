import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Using env variable for security
});

const openai = new OpenAIApi(configuration);

export async function getHealthResponse(query) {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4", // Use GPT-4 for better results
      prompt: `You are a helpful AI health assistant. Answer this question: ${query}`,
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "Sorry, I couldn't process that. Please try again.";
  }
}
