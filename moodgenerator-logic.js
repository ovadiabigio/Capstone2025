const moodMap = {
  Happy: ["Play G–D–C progression", "Strum at 120 bpm"],
  Sad: ["Fingerpick A minor", "Try a slow blues riff"],
  Chill: ["Lo-fi progression", "Smooth fingerpicking in D"],
  Energetic: ["Power chords with palm muting", "Speed drills at 150 bpm"]
};

exports.handler = async (event) => {
  try {
    console.log("Event received:", event);
    const body = JSON.parse(event.body || "{}");
    const mood = body.mood;
    console.log("Mood received:", mood);

    const exercises = moodMap[mood];

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        exercises
          ? { exercises }
          : { message: "No matching exercises found." }
      )
    };
  } catch (err) {
    console.error("Lambda error:", err);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Internal server error" })
    };
  }
};
