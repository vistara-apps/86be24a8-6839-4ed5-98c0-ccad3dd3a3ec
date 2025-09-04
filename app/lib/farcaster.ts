// Mock Farcaster/Neynar implementation for demo
// In a real app, you'd use the actual Neynar API

export interface FarcasterCast {
  text: string;
  imageUrl?: string;
  parentUrl?: string;
}

export async function postToFarcaster(cast: FarcasterCast): Promise<string> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation:
    // const response = await fetch('https://api.neynar.com/v2/farcaster/cast', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NEYNAR_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     signer_uuid: process.env.NEXT_PUBLIC_FARCASTER_SIGNER_UUID,
    //     text: cast.text,
    //     embeds: cast.imageUrl ? [{ url: cast.imageUrl }] : undefined,
    //     parent: cast.parentUrl,
    //   }),
    // });
    // 
    // const data = await response.json();
    // return data.cast.hash;
    
    // Mock cast hash
    return `0x${Math.random().toString(16).slice(2)}`;
  } catch (error) {
    console.error('Farcaster posting failed:', error);
    throw error;
  }
}

export async function getCastMetrics(castHash: string) {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation:
    // const response = await fetch(`https://api.neynar.com/v2/farcaster/cast?identifier=${castHash}`, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NEYNAR_API_KEY}`,
    //   },
    // });
    // 
    // const data = await response.json();
    // return {
    //   likes: data.cast.reactions.likes_count,
    //   recasts: data.cast.reactions.recasts_count,
    //   replies: data.cast.replies.count,
    // };
    
    // Mock metrics
    return {
      likes: Math.floor(Math.random() * 100),
      recasts: Math.floor(Math.random() * 20),
      replies: Math.floor(Math.random() * 10),
    };
  } catch (error) {
    console.error('Failed to fetch cast metrics:', error);
    return { likes: 0, recasts: 0, replies: 0 };
  }
}
