// Mock Supabase implementation for demo
// In a real app, you'd use the actual Supabase client

export interface User {
  userId: string;
  farcasterId?: string;
  createdAt: string;
}

export interface Product {
  productId: string;
  userId: string;
  imageUrl: string;
  createdAt: string;
}

export interface AdVariation {
  variationId: string;
  productId: string;
  generatedImageUrl: string;
  promptUsed: string;
  createdAt: string;
}

export interface Post {
  postId: string;
  variationId: string;
  platform: string;
  postIdOnPlatform?: string;
  status: 'pending' | 'posted' | 'failed';
  createdAt: string;
}

class MockSupabase {
  private data: {
    users: User[];
    products: Product[];
    adVariations: AdVariation[];
    posts: Post[];
  } = {
    users: [],
    products: [],
    adVariations: [],
    posts: [],
  };

  async createUser(userData: Omit<User, 'userId' | 'createdAt'>): Promise<User> {
    const user: User = {
      userId: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...userData,
    };
    this.data.users.push(user);
    return user;
  }

  async createProduct(productData: Omit<Product, 'productId' | 'createdAt'>): Promise<Product> {
    const product: Product = {
      productId: `product_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...productData,
    };
    this.data.products.push(product);
    return product;
  }

  async createAdVariation(variationData: Omit<AdVariation, 'variationId' | 'createdAt'>): Promise<AdVariation> {
    const variation: AdVariation = {
      variationId: `variation_${Date.now()}_${Math.random()}`,
      createdAt: new Date().toISOString(),
      ...variationData,
    };
    this.data.adVariations.push(variation);
    return variation;
  }

  async createPost(postData: Omit<Post, 'postId' | 'createdAt'>): Promise<Post> {
    const post: Post = {
      postId: `post_${Date.now()}_${Math.random()}`,
      createdAt: new Date().toISOString(),
      ...postData,
    };
    this.data.posts.push(post);
    return post;
  }

  async getUserProducts(userId: string): Promise<Product[]> {
    return this.data.products.filter(p => p.userId === userId);
  }

  async getProductVariations(productId: string): Promise<AdVariation[]> {
    return this.data.adVariations.filter(v => v.productId === productId);
  }
}

export const supabase = new MockSupabase();
