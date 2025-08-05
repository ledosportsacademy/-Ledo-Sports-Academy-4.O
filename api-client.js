// API Client for MongoDB Integration
class APIClient {
  constructor() {
    this.baseURL = 'http://localhost:3000/api';
    this.isConnected = false;
    this.checkConnection();
  }

  async checkConnection() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      this.isConnected = data.database === 'Connected';
      console.log('🔗 API Connection Status:', this.isConnected ? 'Connected' : 'Disconnected');
      
      // Update UI status
      if (typeof updateMongoDBStatus === 'function') {
        if (this.isConnected) {
          updateMongoDBStatus('connected', 'MongoDB Connected');
        } else {
          updateMongoDBStatus('disconnected', 'MongoDB Disconnected');
        }
      }
      
      return this.isConnected;
    } catch (error) {
      console.error('❌ API Connection Error:', error);
      this.isConnected = false;
      
      // Update UI status
      if (typeof updateMongoDBStatus === 'function') {
        updateMongoDBStatus('disconnected', 'MongoDB Error');
      }
      
      return false;
    }
  }

  async makeRequest(endpoint, options = {}) {
    if (!this.isConnected) {
      console.warn('⚠️ API not connected, using local data');
      return null;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Members API
  async getMembers() {
    return await this.makeRequest('/members');
  }

  async createMember(memberData) {
    return await this.makeRequest('/members', {
      method: 'POST',
      body: JSON.stringify(memberData)
    });
  }

  async updateMember(id, memberData) {
    return await this.makeRequest(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData)
    });
  }

  async deleteMember(id) {
    return await this.makeRequest(`/members/${id}`, {
      method: 'DELETE'
    });
  }

  // Activities API
  async getActivities() {
    return await this.makeRequest('/activities');
  }

  async createActivity(activityData) {
    return await this.makeRequest('/activities', {
      method: 'POST',
      body: JSON.stringify(activityData)
    });
  }

  async updateActivity(id, activityData) {
    return await this.makeRequest(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(activityData)
    });
  }

  async deleteActivity(id) {
    return await this.makeRequest(`/activities/${id}`, {
      method: 'DELETE'
    });
  }

  // Donations API
  async getDonations() {
    return await this.makeRequest('/donations');
  }

  async createDonation(donationData) {
    return await this.makeRequest('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData)
    });
  }

  async updateDonation(id, donationData) {
    return await this.makeRequest(`/donations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(donationData)
    });
  }

  async deleteDonation(id) {
    return await this.makeRequest(`/donations/${id}`, {
      method: 'DELETE'
    });
  }

  // Expenses API
  async getExpenses() {
    return await this.makeRequest('/expenses');
  }

  async createExpense(expenseData) {
    return await this.makeRequest('/expenses', {
      method: 'POST',
      body: JSON.stringify(expenseData)
    });
  }

  async updateExpense(id, expenseData) {
    return await this.makeRequest(`/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expenseData)
    });
  }

  async deleteExpense(id) {
    return await this.makeRequest(`/expenses/${id}`, {
      method: 'DELETE'
    });
  }

  // Experiences API
  async getExperiences() {
    return await this.makeRequest('/experiences');
  }

  async createExperience(experienceData) {
    return await this.makeRequest('/experiences', {
      method: 'POST',
      body: JSON.stringify(experienceData)
    });
  }

  async updateExperience(id, experienceData) {
    return await this.makeRequest(`/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experienceData)
    });
  }

  async deleteExperience(id) {
    return await this.makeRequest(`/experiences/${id}`, {
      method: 'DELETE'
    });
  }

  // Gallery API
  async getGallery() {
    return await this.makeRequest('/gallery');
  }

  async createGalleryItem(galleryData) {
    return await this.makeRequest('/gallery', {
      method: 'POST',
      body: JSON.stringify(galleryData)
    });
  }

  async updateGalleryItem(id, galleryData) {
    return await this.makeRequest(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(galleryData)
    });
  }

  async deleteGalleryItem(id) {
    return await this.makeRequest(`/gallery/${id}`, {
      method: 'DELETE'
    });
  }

  // Hero Slides API
  async getHeroSlides() {
    return await this.makeRequest('/hero-slides');
  }

  async createHeroSlide(heroSlideData) {
    return await this.makeRequest('/hero-slides', {
      method: 'POST',
      body: JSON.stringify(heroSlideData)
    });
  }

  async updateHeroSlide(id, heroSlideData) {
    return await this.makeRequest(`/hero-slides/${id}`, {
      method: 'PUT',
      body: JSON.stringify(heroSlideData)
    });
  }

  async deleteHeroSlide(id) {
    return await this.makeRequest(`/hero-slides/${id}`, {
      method: 'DELETE'
    });
  }

  // Weekly Fees API
  async getWeeklyFees() {
    return await this.makeRequest('/weekly-fees');
  }

  async createWeeklyFee(weeklyFeeData) {
    return await this.makeRequest('/weekly-fees', {
      method: 'POST',
      body: JSON.stringify(weeklyFeeData)
    });
  }

  async updateWeeklyFee(id, weeklyFeeData) {
    return await this.makeRequest(`/weekly-fees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(weeklyFeeData)
    });
  }

  async deleteWeeklyFee(id) {
    return await this.makeRequest(`/weekly-fees/${id}`, {
      method: 'DELETE'
    });
  }

  // Dashboard Stats API
  async getDashboardStats() {
    return await this.makeRequest('/dashboard-stats');
  }
}

// Global API client instance
const apiClient = new APIClient();

// Data synchronization functions
async function syncDataFromMongoDB() {
  try {
    console.log('🔄 Syncing data from MongoDB...');
    
    // Check if API is connected
    const isConnected = await apiClient.checkConnection();
    if (!isConnected) {
      console.log('⚠️ Using local data (API not connected)');
      return false;
    }

    // Sync all data types
    const [
      members,
      activities,
      donations,
      expenses,
      experiences,
      gallery,
      heroSlides,
      weeklyFees
    ] = await Promise.all([
      apiClient.getMembers(),
      apiClient.getActivities(),
      apiClient.getDonations(),
      apiClient.getExpenses(),
      apiClient.getExperiences(),
      apiClient.getGallery(),
      apiClient.getHeroSlides(),
      apiClient.getWeeklyFees()
    ]);

    // Update local appData with MongoDB data
    if (members) appData.members = members;
    if (activities) appData.activities = activities;
    if (donations) appData.donations = donations;
    if (expenses) appData.expenses = expenses;
    if (experiences) appData.experiences = experiences;
    if (gallery) appData.gallery = gallery;
    if (heroSlides) appData.heroSlides = heroSlides;
    if (weeklyFees) appData.weeklyFees = weeklyFees;

    console.log('✅ Data synced successfully from MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Error syncing data:', error);
    return false;
  }
}

async function syncDataToMongoDB() {
  try {
    console.log('🔄 Syncing data to MongoDB...');
    
    const isConnected = await apiClient.checkConnection();
    if (!isConnected) {
      console.log('⚠️ Cannot sync to MongoDB (API not connected)');
      return false;
    }

    // Sync all data types to MongoDB
    await Promise.all([
      // Clear existing data and sync members
      apiClient.getMembers().then(async (existingMembers) => {
        if (existingMembers) {
          for (const member of existingMembers) {
            await apiClient.deleteMember(member._id);
          }
        }
        for (const member of appData.members) {
          await apiClient.createMember(member);
        }
      }),

      // Clear existing data and sync activities
      apiClient.getActivities().then(async (existingActivities) => {
        if (existingActivities) {
          for (const activity of existingActivities) {
            await apiClient.deleteActivity(activity._id);
          }
        }
        for (const activity of appData.activities) {
          await apiClient.createActivity(activity);
        }
      }),

      // Clear existing data and sync donations
      apiClient.getDonations().then(async (existingDonations) => {
        if (existingDonations) {
          for (const donation of existingDonations) {
            await apiClient.deleteDonation(donation._id);
          }
        }
        for (const donation of appData.donations) {
          await apiClient.createDonation(donation);
        }
      }),

      // Clear existing data and sync expenses
      apiClient.getExpenses().then(async (existingExpenses) => {
        if (existingExpenses) {
          for (const expense of existingExpenses) {
            await apiClient.deleteExpense(expense._id);
          }
        }
        for (const expense of appData.expenses) {
          await apiClient.createExpense(expense);
        }
      }),

      // Clear existing data and sync experiences
      apiClient.getExperiences().then(async (existingExperiences) => {
        if (existingExperiences) {
          for (const experience of existingExperiences) {
            await apiClient.deleteExperience(experience._id);
          }
        }
        for (const experience of appData.experiences) {
          await apiClient.createExperience(experience);
        }
      }),

      // Clear existing data and sync gallery
      apiClient.getGallery().then(async (existingGallery) => {
        if (existingGallery) {
          for (const galleryItem of existingGallery) {
            await apiClient.deleteGalleryItem(galleryItem._id);
          }
        }
        for (const galleryItem of appData.gallery) {
          await apiClient.createGalleryItem(galleryItem);
        }
      }),

      // Clear existing data and sync hero slides
      apiClient.getHeroSlides().then(async (existingHeroSlides) => {
        if (existingHeroSlides) {
          for (const heroSlide of existingHeroSlides) {
            await apiClient.deleteHeroSlide(heroSlide._id);
          }
        }
        for (const heroSlide of appData.heroSlides) {
          await apiClient.createHeroSlide(heroSlide);
        }
      }),

      // Clear existing data and sync weekly fees
      apiClient.getWeeklyFees().then(async (existingWeeklyFees) => {
        if (existingWeeklyFees) {
          for (const weeklyFee of existingWeeklyFees) {
            await apiClient.deleteWeeklyFee(weeklyFee._id);
          }
        }
        for (const weeklyFee of appData.weeklyFees) {
          await apiClient.createWeeklyFee(weeklyFee);
        }
      })
    ]);

    console.log('✅ Data synced successfully to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Error syncing data to MongoDB:', error);
    return false;
  }
}

// Enhanced CRUD functions with MongoDB integration
async function saveMemberWithMongoDB() {
  const name = document.getElementById('memberName').value;
  const contact = document.getElementById('memberContact').value;
  const phone = document.getElementById('memberPhone').value;
  const role = document.getElementById('memberRole').value;
  const joinDate = document.getElementById('memberJoinDate').value;
  const image = document.getElementById('memberImage').value || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';

  const memberData = { name, contact, phone, role, joinDate, image };

  try {
    if (currentEditingItem) {
      // Update existing member
      const updatedMember = await apiClient.updateMember(currentEditingItem, memberData);
      if (updatedMember) {
        const index = appData.members.findIndex(m => m._id === currentEditingItem || m.id === currentEditingItem);
        if (index !== -1) {
          appData.members[index] = updatedMember;
        }
        showMessage('Member updated successfully');
      }
    } else {
      // Create new member
      const newMember = await apiClient.createMember(memberData);
      if (newMember) {
        appData.members.push(newMember);
        showMessage('Member added successfully');
      }
    }

    renderMembers();
    renderWeeklyFees();
    updateDashboardMetrics();
  } catch (error) {
    console.error('Error saving member:', error);
    showMessage('Error saving member to database', 'error');
  }
}

async function saveActivityWithMongoDB() {
  const title = document.getElementById('activityTitle').value;
  const date = document.getElementById('activityDate').value;
  const time = document.getElementById('activityTime').value;
  const description = document.getElementById('activityDescription').value;
  const image = document.getElementById('activityImage').value || 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop';
  const status = document.getElementById('activityStatus').value;
  const redirectUrl = document.getElementById('activityRedirectUrl').value;
  const openNewTab = document.getElementById('activityOpenNewTab').checked;

  const activityData = { title, date, time, description, image, status, redirectUrl, openNewTab };

  try {
    if (currentEditingItem) {
      // Update existing activity
      const updatedActivity = await apiClient.updateActivity(currentEditingItem, activityData);
      if (updatedActivity) {
        const index = appData.activities.findIndex(a => a._id === currentEditingItem || a.id === currentEditingItem);
        if (index !== -1) {
          appData.activities[index] = updatedActivity;
        }
        showMessage('Activity updated successfully');
      }
    } else {
      // Create new activity
      const newActivity = await apiClient.createActivity(activityData);
      if (newActivity) {
        appData.activities.push(newActivity);
        showMessage('Activity added successfully');
      }
    }

    renderActivities();
    renderHomeEvents();
    renderRecentActivities();
    updateDashboardMetrics();
  } catch (error) {
    console.error('Error saving activity:', error);
    showMessage('Error saving activity to database', 'error');
  }
}

// Initialize API integration when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
  console.log('🔗 Initializing MongoDB integration...');
  
  // Try to sync data from MongoDB on startup
  const syncSuccess = await syncDataFromMongoDB();
  
  if (syncSuccess) {
    console.log('✅ MongoDB integration active');
    showMessage('Connected to MongoDB database', 'success');
  } else {
    console.log('⚠️ Using local data (MongoDB not available)');
    showMessage('Using local data (MongoDB not connected)', 'info');
  }
  
  // Initialize the app after data sync
  initializeApp();
}); 