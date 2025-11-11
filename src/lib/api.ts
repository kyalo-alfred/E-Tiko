// Mock API layer - Replace with actual backend API calls

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'attendee' | 'organizer';
  verified: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  organizerId: string;
  organizerName: string;
  categories: TicketCategory[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface TicketCategory {
  id: string;
  name: string;
  price: number;
  available: number;
  total: number;
}

export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  categoryId: string;
  categoryName: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  bookingDate: string;
  transactionId?: string;
}

export interface AnalyticsData {
  totalRevenue: number;
  totalTicketsSold: number;
  totalEvents: number;
  eventSales: { name: string; sales: number; revenue: number }[];
  monthlySales: { month: string; tickets: number; revenue: number }[];
}

// Mock data
let currentUser: User | null = null;
let pendingVerification: { email: string; code: string; userData: Partial<User> } | null = null;

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254712345678',
    role: 'organizer',
    verified: true,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254723456789',
    role: 'attendee',
    verified: true,
    createdAt: new Date('2024-02-20').toISOString(),
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+254734567890',
    role: 'attendee',
    verified: true,
    createdAt: new Date('2024-03-10').toISOString(),
  },
];

// Mock events database
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring the latest in AI, Web3, and Cloud Computing',
    date: '2025-11-15T09:00:00',
    location: 'Nairobi Convention Center',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    organizerId: '1',
    organizerName: 'John Doe',
    status: 'upcoming',
    categories: [
      { id: 'c1', name: 'VIP', price: 5000, available: 20, total: 50 },
      { id: 'c2', name: 'Regular', price: 2000, available: 80, total: 200 },
      { id: 'c3', name: 'Early Bird', price: 1500, available: 0, total: 100 },
    ],
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'Three-day music festival featuring local and international artists',
    date: '2025-12-01T14:00:00',
    location: 'Uhuru Gardens',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    organizerId: '1',
    organizerName: 'John Doe',
    status: 'upcoming',
    categories: [
      { id: 'c4', name: 'VIP', price: 8000, available: 30, total: 100 },
      { id: 'c5', name: 'Regular', price: 3000, available: 150, total: 500 },
    ],
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Watch innovative startups pitch their ideas to top investors',
    date: '2025-10-30T18:00:00',
    location: 'iHub Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1559223607-a43c990a968c?w=800',
    organizerId: '1',
    organizerName: 'John Doe',
    status: 'upcoming',
    categories: [
      { id: 'c6', name: 'General Admission', price: 1000, available: 100, total: 150 },
    ],
  },
];

// Mock bookings database
const mockBookings: Booking[] = [
  {
    id: 'b1',
    eventId: '1',
    eventTitle: 'Tech Conference 2025',
    userId: '2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    categoryId: 'c2',
    categoryName: 'Regular',
    quantity: 2,
    totalAmount: 4000,
    paymentStatus: 'completed',
    bookingDate: new Date('2024-10-15').toISOString(),
    transactionId: 'MPX123456789',
  },
  {
    id: 'b2',
    eventId: '2',
    eventTitle: 'Music Festival',
    userId: '3',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    categoryId: 'c5',
    categoryName: 'Regular',
    quantity: 1,
    totalAmount: 3000,
    paymentStatus: 'completed',
    bookingDate: new Date('2024-10-18').toISOString(),
    transactionId: 'MPX987654321',
  },
];

// Generate mock verification code
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Auth API
export const authApi = {
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'attendee' | 'organizer';
  }): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const verificationCode = generateVerificationCode();
    pendingVerification = {
      email: userData.email,
      code: verificationCode,
      userData: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
      },
    };

    console.log('📧 Verification code sent to email:', verificationCode);
    return { success: true, message: `Verification code sent to ${userData.email}. Code: ${verificationCode}` };
  },

  verify2FA: async (email: string, code: string): Promise<{ success: boolean; user: User }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!pendingVerification || pendingVerification.email !== email) {
      throw new Error('No pending verification found');
    }

    if (pendingVerification.code !== code) {
      throw new Error('Invalid verification code');
    }

    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name: pendingVerification.userData.name!,
      email: pendingVerification.userData.email!,
      phone: pendingVerification.userData.phone!,
      role: pendingVerification.userData.role!,
      verified: true,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    currentUser = newUser;
    pendingVerification = null;

    return { success: true, user: newUser };
  },

  login: async (email: string, password: string): Promise<{ success: boolean; requiresVerification?: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const verificationCode = generateVerificationCode();
    pendingVerification = {
      email: user.email,
      code: verificationCode,
      userData: user,
    };

    console.log('📧 2FA code sent to email:', verificationCode);
    return { success: true, requiresVerification: true };
  },

  verifyLogin2FA: async (email: string, code: string): Promise<{ success: boolean; user: User }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!pendingVerification || pendingVerification.email !== email) {
      throw new Error('No pending verification found');
    }

    if (pendingVerification.code !== code) {
      throw new Error('Invalid verification code');
    }

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    currentUser = user;
    pendingVerification = null;

    return { success: true, user };
  },

  requestPasswordReset: async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Email not found');
    }

    const resetCode = generateVerificationCode();
    console.log('📧 Password reset code:', resetCode);
    
    return { success: true, message: `Password reset code sent to ${email}. Code: ${resetCode}` };
  },

  resetPassword: async (email: string, code: string, newPassword: string): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real implementation, verify the code and update password
    return { success: true };
  },

  logout: async (): Promise<void> => {
    currentUser = null;
    pendingVerification = null;
  },

  getCurrentUser: (): User | null => {
    return currentUser;
  },
};

// Events API
export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockEvents];
  },

  getById: async (id: string): Promise<Event | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEvents.find(e => e.id === id) || null;
  },

  getByOrganizer: async (organizerId: string): Promise<Event[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents.filter(e => e.organizerId === organizerId);
  },

  create: async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newEvent: Event = {
      ...eventData,
      id: (mockEvents.length + 1).toString(),
    };
    mockEvents.push(newEvent);
    return newEvent;
  },

  update: async (id: string, eventData: Partial<Event>): Promise<Event> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockEvents.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Event not found');
    
    mockEvents[index] = { ...mockEvents[index], ...eventData };
    return mockEvents[index];
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockEvents.findIndex(e => e.id === id);
    if (index !== -1) {
      mockEvents.splice(index, 1);
    }
  },
};

// Bookings API
export const bookingsApi = {
  create: async (bookingData: Omit<Booking, 'id' | 'bookingDate'>): Promise<Booking> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newBooking: Booking = {
      ...bookingData,
      id: `b${mockBookings.length + 1}`,
      bookingDate: new Date().toISOString(),
    };
    mockBookings.push(newBooking);
    return newBooking;
  },

  getUserBookings: async (userId: string): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBookings.filter(b => b.userId === userId);
  },

  getEventBookings: async (eventId: string): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBookings.filter(b => b.eventId === eventId);
  },

  getAll: async (): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockBookings];
  },
};

// Payment API (M-Pesa Mock)
export const paymentApi = {
  initiateMpesa: async (phoneNumber: string, amount: number): Promise<{ success: boolean; checkoutRequestId: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('📱 M-Pesa STK Push initiated:', { phoneNumber, amount });
    return {
      success: true,
      checkoutRequestId: `CR${Date.now()}`,
    };
  },

  checkPaymentStatus: async (checkoutRequestId: string): Promise<{ status: 'pending' | 'completed' | 'failed'; transactionId?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate successful payment
    return {
      status: 'completed',
      transactionId: `MPX${Date.now()}`,
    };
  },
};

// Users API
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsers];
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
    }
  },

  update: async (id: string, userData: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return mockUsers[index];
  },
};

// Analytics API
export const analyticsApi = {
  getOrganizerAnalytics: async (organizerId: string): Promise<AnalyticsData> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const organizerEvents = mockEvents.filter(e => e.organizerId === organizerId);
    const organizerBookings = mockBookings.filter(b => 
      organizerEvents.some(e => e.id === b.eventId)
    );

    const totalRevenue = organizerBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const totalTicketsSold = organizerBookings.reduce((sum, b) => sum + b.quantity, 0);

    const eventSales = organizerEvents.map(event => {
      const eventBookings = organizerBookings.filter(b => b.eventId === event.id);
      return {
        name: event.title,
        sales: eventBookings.reduce((sum, b) => sum + b.quantity, 0),
        revenue: eventBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      };
    });

    const monthlySales = [
      { month: 'Jun', tickets: 45, revenue: 135000 },
      { month: 'Jul', tickets: 68, revenue: 204000 },
      { month: 'Aug', tickets: 52, revenue: 156000 },
      { month: 'Sep', tickets: 89, revenue: 267000 },
      { month: 'Oct', tickets: 120, revenue: 360000 },
    ];

    return {
      totalRevenue,
      totalTicketsSold,
      totalEvents: organizerEvents.length,
      eventSales,
      monthlySales,
    };
  },
};
