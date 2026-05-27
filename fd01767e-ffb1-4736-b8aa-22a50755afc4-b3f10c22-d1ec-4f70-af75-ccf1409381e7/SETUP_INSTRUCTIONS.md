# Plant Care Scheduler - Setup Instructions

## Complete Full-Stack Application

This is a complete Plant Care Scheduler application with React.js frontend and Spring Boot backend.

### Features Implemented:
- ✅ Add plants with: plantName, wateringFrequency, sunlightHours, fertilizingFrequency
- ✅ View all plants in a clean card layout
- ✅ Edit existing plants
- ✅ Delete plants with confirmation
- ✅ Generate care plans with two sorting methods:
  - **Water First**: Sort by watering frequency (ascending)
  - **Sunlight First**: Sort by sunlight hours (descending)
- ✅ Form validation (all fields required, positive integers)
- ✅ Proper CORS configuration
- ✅ Complete CRUD API endpoints

### API Endpoints:
- `POST /api/plants` - Add new plant
- `GET /api/plants` - Get all plants
- `PUT /api/plants/{id}` - Update plant
- `DELETE /api/plants/{id}` - Delete plant
- `GET /api/plants/plan?method={water|sunlight}` - Generate care plan

### Running the Application:

#### Backend (Spring Boot):
```bash
cd springapp
mvn spring-boot:run
```
Backend will run on: https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io

#### Frontend (React):
```bash
cd reactapp
npm install
npm start
```
Frontend will run on: https://8081-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io

### Testing:
```bash
cd springapp
mvn test
```

### Sample Test Data:
You can add these plants to test the functionality:
1. **Rose** - Water: 3 days, Sunlight: 6 hours, Fertilizer: 15 days
2. **Cactus** - Water: 14 days, Sunlight: 8 hours, Fertilizer: 60 days
3. **Aloe Vera** - Water: 7 days, Sunlight: 5 hours, Fertilizer: 30 days

### Care Plan Testing:
- **Water First**: Will show Cactus → Aloe Vera → Rose (ascending watering frequency)
- **Sunlight First**: Will show Cactus → Rose → Aloe Vera (descending sunlight hours)

The application is now complete and ready for production use!