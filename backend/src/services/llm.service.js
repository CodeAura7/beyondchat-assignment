const axios = require('axios');

const rewriteArticle = async (
  title,
  originalContent,
  referenceContents
) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl =
      process.env.OPENAI_API_URL ||
      'https://api.openai.com/v1/chat/completions';

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const prompt = `
You are a professional content writer. Rewrite the following article
with a fresh perspective using the original content and reference materials.

Original Title:
${title}

Original Content:
${originalContent}

Reference Materials:
${referenceContents.join('\n\n---\n\n')}

Instructions:
- Keep core topic intact
- Use reference insights
- Ensure originality
- Write clearly and engagingly
`;

    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You rewrite articles professionally while preserving meaning.',
          },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling LLM:', error.message);
    throw new Error('Failed to rewrite article');
  }
};

module.exports = { rewriteArticle };
