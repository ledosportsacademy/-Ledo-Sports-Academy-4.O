# Ledo Sports Academy - Management System v4.3.0

A comprehensive sports academy management system with MongoDB integration for data persistence.

## 🚀 Features

- **Member Management**: Track academy members, their roles, and contact information
- **Activity Management**: Schedule and manage training sessions, matches, and events
- **Financial Tracking**: Monitor donations, expenses, and weekly fees
- **Gallery Management**: Upload and organize photos with featured slideshow
- **Dashboard Analytics**: Real-time statistics and charts
- **MongoDB Integration**: Persistent data storage with cloud database
- **Admin Panel**: Secure administrative controls for data management
- **Responsive Design**: Mobile-friendly interface

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account (free tier available)

## 🛠️ Installation

1. **Clone or download the project files**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure MongoDB connection**
   - The application is pre-configured with your MongoDB Atlas connection string
   - Connection string: `mongodb+srv://ledosportsacademy:iD0xFkdX5IqDXWLK@cluster0.bpaauiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`
   - The API will be available at: `http://localhost:3000/api`

## 🗄️ Database Schema

The application uses the following MongoDB collections:

### Members
```javascript
{
  name: String (required),
  contact: String (required),
  phone: String (required),
  joinDate: String (required),
  role: String (required),
  image: String (default: profile image URL)
}
```

### Activities
```javascript
{
  title: String (required),
  date: String (required),
  time: String (required),
  description: String (required),
  image: String (default: activity image URL),
  status: String (enum: 'upcoming', 'recent', 'completed'),
  type: String (default: 'match'),
  priority: String (default: 'medium'),
  redirectUrl: String (optional),
  openNewTab: Boolean (default: false)
}
```

### Donations
```javascript
{
  donorName: String (required),
  amount: Number (required),
  date: String (required),
  purpose: String (required)
}
```

### Expenses
```javascript
{
  description: String (required),
  amount: Number (required),
  date: String (required),
  category: String (required),
  vendor: String (required),
  paymentMethod: String (required)
}
```

### Gallery
```javascript
{
  title: String (required),
  url: String (required),
  album: String (optional),
  isTopFive: Boolean (default: false),
  order: Number (default: 0)
}
```

### Hero Slides
```javascript
{
  title: String (required),
  subtitle: String (required),
  description: String (required),
  backgroundImage: String (required),
  ctaText: String (required),
  ctaLink: String (required),
  redirectUrl: String (optional),
  openNewTab: Boolean (default: false)
}
```

## 🔧 API Endpoints

### Health Check
- `GET /api/health` - Check server and database status

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Donations
- `GET /api/donations` - Get all donations
- `POST /api/donations` - Create new donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Create new gallery item
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

### Hero Slides
- `GET /api/hero-slides` - Get all hero slides
- `POST /api/hero-slides` - Create new hero slide
- `PUT /api/hero-slides/:id` - Update hero slide
- `DELETE /api/hero-slides/:id` - Delete hero slide

### Weekly Fees
- `GET /api/weekly-fees` - Get all weekly fee records
- `POST /api/weekly-fees` - Create new weekly fee record
- `PUT /api/weekly-fees/:id` - Update weekly fee record
- `DELETE /api/weekly-fees/:id` - Delete weekly fee record

### Dashboard Stats
- `GET /api/dashboard-stats` - Get dashboard statistics

## 🔐 Admin Access

- **Username**: Any (not required)
- **Password**: `admin123`
- **Keyboard Shortcut**: `Ctrl + Shift + A` (opens admin login)

## 📊 Features

### Dashboard
- Real-time statistics
- Financial charts
- Recent activities summary
- Export functionality (PDF)

### Member Management
- Add, edit, and delete members
- Search and filter members
- Track member roles and join dates
- Weekly fee tracking

### Activity Management
- Schedule upcoming events
- Track recent activities
- Custom redirect URLs
- Priority and status management

### Financial Management
- Track donations and expenses
- Categorize expenses
- Generate financial reports
- Net balance calculations

### Gallery Management
- Upload photos with albums
- Featured photos for slideshow
- Drag-and-drop reordering
- Lightbox image viewer

### Hero Slideshow
- Dynamic slideshow management
- Custom call-to-action buttons
- External link support
- Background image customization

## 🎨 Customization

### Colors
The application uses CSS custom properties for easy theming:
```css
:root {
  --color-primary: #218081;
  --color-secondary: #5e5240;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}
```

### Styling
- Responsive design with mobile-first approach
- Dark/light mode support
- Custom animations and transitions
- Modern UI components

## 🔧 Configuration

### Environment Variables
Create a `config.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://ledosportsacademy:iD0xFkdX5IqDXWLK@cluster0.bpaauiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
NODE_ENV=development
```

### Database Connection
The application automatically connects to MongoDB Atlas on startup. Connection status is displayed in the header.

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure your MongoDB connection string
- Set appropriate port number

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check your internet connection
   - Verify the connection string in `config.env`
   - Ensure MongoDB Atlas cluster is running

2. **Port Already in Use**
   - Change the port in `config.env`
   - Or kill the process using the port

3. **Admin Login Not Working**
   - Use password: `admin123`
   - Try the keyboard shortcut: `Ctrl + Shift + A`

4. **Images Not Loading**
   - Ensure image URLs are valid
   - Check if images are publicly accessible

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Check the troubleshooting section
- Review the API documentation
- Contact the development team

---

**Ledo Sports Academy Management System v4.3.0** - Built with ❤️ for sports excellence 