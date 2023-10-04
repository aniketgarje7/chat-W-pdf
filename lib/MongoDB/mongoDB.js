import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connections[0].readyState) {
    // If a connection is already established, reuse it
    console.log('existing connection available')
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // Replace 'mydatabase' with your actual database name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the Node.js process on connection error
  }
}

async function disconnectDB() {
  if (mongoose.connections[0].readyState) {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

export { connectDB, disconnectDB };