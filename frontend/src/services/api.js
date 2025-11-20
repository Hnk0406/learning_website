const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    console.log(`API Call: ${endpoint}`, config);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error ${response.status}:`, errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Auth services
export const authService = {
  register: (userData) => apiCall('/auth/register', { 
    method: 'POST', 
    body: userData 
  }),
  
  login: (credentials) => apiCall('/auth/login', { 
    method: 'POST', 
    body: credentials 
  }),
};

// Course services
export const courseService = {
  getCourses: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return apiCall(`/courses?${params}`);
  },
  
  getCourse: (id) => apiCall(`/courses/${id}`),
  
  getEnrolledCourses: () => apiCall('/courses/user/enrolled'),
  
  enroll: (courseId) => apiCall(`/courses/${courseId}/enroll`, { 
    method: 'POST' 
  }),
  
  createCourse: (courseData) => apiCall('/courses', {
    method: 'POST',
    body: courseData
  }),
  
  updateCourse: (id, courseData) => apiCall(`/courses/${id}`, {
    method: 'PUT',
    body: courseData
  }),
  
  deleteCourse: (id) => apiCall(`/courses/${id}`, {
    method: 'DELETE'
  })
};

// User services
export const userService = {
  getProfile: () => apiCall('/user/profile'),
  
  updateProfile: (profileData) => apiCall('/user/profile', { 
    method: 'PUT', 
    body: profileData 
  }),
  
  getFavorites: () => apiCall('/user/favorites'),
  
  addFavorite: (courseId) => apiCall(`/user/favorites/${courseId}`, { 
    method: 'POST' 
  }),
  
  removeFavorite: (courseId) => apiCall(`/user/favorites/${courseId}`, { 
    method: 'DELETE' 
  }),
  
  updateFocusStats: (stats) => apiCall('/user/focus-stats', { 
    method: 'PATCH', 
    body: stats 
  }),
};

// Progress services
export const progressService = {
  updateProgress: (lessonId, progressData) => 
    apiCall(`/progress/${lessonId}`, { 
      method: 'POST', 
      body: progressData 
    }),
  
  getCourseProgress: (courseId) => apiCall(`/progress/course/${courseId}`),
  
  getLessonProgress: (lessonId) => apiCall(`/progress/lesson/${lessonId}`),
};

// Lesson services
export const lessonService = {
  getLessons: (courseId) => apiCall(`/lessons/course/${courseId}`),
  
  getLesson: (id) => apiCall(`/lessons/${id}`),
  
  createLesson: (lessonData) => apiCall('/lessons', {
    method: 'POST',
    body: lessonData
  }),
  
  updateLesson: (id, lessonData) => apiCall(`/lessons/${id}`, {
    method: 'PUT',
    body: lessonData
  }),
  
  deleteLesson: (id) => apiCall(`/lessons/${id}`, {
    method: 'DELETE'
  })
};

// Material services
export const materialService = {
  getMaterials: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return apiCall(`/materials?${params}`);
  },
  
  getMaterial: (id) => apiCall(`/materials/${id}`),
  
  createMaterial: (materialData) => apiCall('/materials', {
    method: 'POST',
    body: materialData
  }),
  
  updateMaterial: (id, materialData) => apiCall(`/materials/${id}`, {
    method: 'PUT',
    body: materialData
  }),
  
  deleteMaterial: (id) => apiCall(`/materials/${id}`, {
    method: 'DELETE'
  })
};

// Enrollment services
export const enrollmentService = {
  getEnrollments: () => apiCall('/enrollments'),
  
  getEnrollment: (id) => apiCall(`/enrollments/${id}`),
  
  createEnrollment: (enrollmentData) => apiCall('/enrollments', {
    method: 'POST',
    body: enrollmentData
  }),
  
  updateEnrollment: (id, enrollmentData) => apiCall(`/enrollments/${id}`, {
    method: 'PUT',
    body: enrollmentData
  }),
  
  deleteEnrollment: (id) => apiCall(`/enrollments/${id}`, {
    method: 'DELETE'
  })
};

// Favorite services
export const favoriteService = {
  getFavorites: () => apiCall('/favorites'),
  
  checkFavorite: (courseId) => apiCall(`/favorites/check/${courseId}`),
  
  toggleFavorite: (courseId) => apiCall(`/favorites/toggle/${courseId}`, {
    method: 'POST'
  }),
  
  removeFavorite: (courseId) => apiCall(`/favorites/${courseId}`, {
    method: 'DELETE'
  })
};

// Contact services
export const contactService = {
  submitContact: (contactData) => apiCall('/contact', {
    method: 'POST',
    body: contactData
  }),
  
  getSubmissions: () => apiCall('/contact/submissions')
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Get current user token
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // Set authentication token
  setToken: (token) => {
    localStorage.setItem('token', token);
  },
  
  // Remove authentication token (logout)
  removeToken: () => {
    localStorage.removeItem('token');
  },
  
  // Get current user from localStorage if stored
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Set current user in localStorage
  setCurrentUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  
  // Remove current user from localStorage
  removeCurrentUser: () => {
    localStorage.removeItem('currentUser');
  },
  
  // Clear all auth data
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
};

// Export everything
export default {
  authService,
  courseService,
  userService,
  progressService,
  lessonService,
  materialService,
  enrollmentService,
  favoriteService,
  contactService,
  apiUtils
};