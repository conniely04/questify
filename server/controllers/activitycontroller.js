const Activity = require("../schemas/activity");
const Hangout = require("../schemas/hangout");
const User = require("../schemas/user");

// Example POST endpoint for creating an activity
exports.addActivity = async (req, res) => {
  const { name, hangout, created_by, preferences } = req.body;

  try {
    // Optional: Check if the user creating the activity is the creator of the hangout or has the right to add activities
    // This might involve fetching the hangout and comparing the created_by field with the user ID

    // Create a new activity
    const newActivity = new Activity({
      name,
      hangout,
      created_by,
      preferences,
    });

    // Save the new activity
    await newActivity.save();

    res
      .status(201)
      .json({ message: "Activity added successfully", activity: newActivity });
  } catch (error) {
    console.error("Error adding activity:", error);
    res.status(500).json({ error: error.message });
  }
};

// Example GET endpoint for retrieving activities in a hangout
exports.getActivitiesByHangout = async (req, res) => {
  const { hangoutId } = req.params;

  try {
    // Find all activities associated with the hangout
    const activities = await Activity.find({ hangout: hangoutId });

    res.json(activities);
  } catch (error) {
    console.error("Failed to retrieve activities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
