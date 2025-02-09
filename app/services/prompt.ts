import { PromptRequest } from '@/types/prompt'

export interface PromptResponse {
  raw_prompt: string
  enhanced_prompt: string
  seed: string
}

export async function generatePrompt(request: PromptRequest): Promise<PromptResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.error('API URL is not configured');
    throw new Error('API URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable.');
  }

  const endpoint = `${apiUrl}/prompt/generate`;
  console.log('Sending request to:', endpoint);
  console.log('Request payload:', request);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('API error response:', errorData);
      throw new Error(
        errorData?.detail || 
        `HTTP error! status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Failed to generate prompt:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(
        'Unable to reach the API server. Please check your internet connection and try again.'
      );
    }
    throw error;
  }
} 