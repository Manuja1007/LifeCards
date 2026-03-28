export const analyzeBehavior = (screenTime, focusSessions, moods, moodValue) => {
  // Calculate distraction score (based on social media & entertainment usage)
  const youtubeHours = screenTime?.youtube || 0;
  const instagramHours = screenTime?.instagram || 0;
  const whatsappHours = screenTime?.whatsapp || 0;
  const vscodeHours = screenTime?.vscode || 0;

  const totalDistractionHours = youtubeHours + instagramHours + whatsappHours;
  const distractionScore = Math.min(100, totalDistractionHours * 15); // 15 points per hour

  // Focus score (based on focus sessions & productive work)
  const focusScore = Math.min(100, focusSessions * 20); // 20 points per session
  const productiveHours = vscodeHours;

  // Mood indicator
  const moodScore = moodValue || 3; // 1-5 scale

  // Calculate balance percentage
  const totalScreenHours = youtubeHours + instagramHours + whatsappHours + vscodeHours;
  const focusPercentage = totalScreenHours > 0 ? (vscodeHours / totalScreenHours) * 100 : 0;

  // Generate insights
  const insights = {
    distractionScore: Math.round(distractionScore),
    focusScore: Math.round(focusScore),
    moodScore,
    totalScreenTime: totalScreenHours,
    productiveHours,
    distractionHours: totalDistractionHours,
    focusSessions,
    focusPercentage: Math.round(focusPercentage),
    overallHealth: calculateOverallHealth(distractionScore, focusScore, moodScore),
  };

  return insights;
};

function calculateOverallHealth(distraction, focus, mood) {
  const healthScore = (focus - distraction / 2 + mood * 15) / Math.max(1, focus + distraction / 2);
  if (healthScore > 0.7) return "excellent";
  if (healthScore > 0.4) return "good";
  if (healthScore > 0.1) return "fair";
  return "needs-improvement";
}

export const generateProductivitySuggestions = (screenTime, focusSessions, moods, moodValue) => {
  const insights = analyzeBehavior(screenTime, focusSessions, moods, moodValue);
  const suggestions = [];

  // Analysis-based suggestions
  if (insights.distractionScore > 70) {
    suggestions.push({
      id: "reduce-socials",
      title: "Time to Focus",
      description: "Your social media usage is high. Try using the Focus Timer to limit distractions.",
      action: "Start 25-min Focus Session",
      icon: "🎯",
      priority: "high",
      category: "focus"
    });
  }

  if (insights.focusSessions < 3) {
    suggestions.push({
      id: "more-focus",
      title: "Build Focus Habit",
      description: `You've completed ${insights.focusSessions} focus session(s) today. Aim for at least 5 to boost productivity.`,
      action: "Start Focus Timer",
      icon: "⏱️",
      priority: "medium",
      category: "focus"
    });
  }

  if (insights.totalScreenTime > 6) {
    suggestions.push({
      id: "screen-break",
      title: "Take a Break",
      description: `You've been on screens for ${insights.totalScreenTime.toFixed(1)}h today. Time for some fresh air!`,
      action: "Take a 15-min Break",
      icon: "🌿",
      priority: "high",
      category: "wellness"
    });
  }

  if (insights.productiveHours < 2 && insights.totalScreenTime > 2) {
    suggestions.push({
      id: "balance-work",
      title: "Rebalance Your Day",
      description: `Only ${insights.productiveHours}h of productive work today. Let's focus on what matters.`,
      action: "Plan Your Tasks",
      icon: "📋",
      priority: "high",
      category: "productivity"
    });
  }

  if (moodValue <= 2) {
    suggestions.push({
      id: "mood-boost",
      title: "Lift Your Mood",
      description: "You seem to be in a low mood. Try taking a walk or talking to someone.",
      action: "Reflection & Self-Care",
      icon: "💝",
      priority: "high",
      category: "wellness"
    });
  }

  if (insights.youtubeHours > insights.instagramHours + 2) {
    suggestions.push({
      id: "youtube-limit",
      title: "Reduce YouTube",
      description: `YouTube is taking ${insights.youtubeHours}h of your time. Consider limiting it to short sessions.`,
      action: "Set Time Limit",
      icon: "🎬",
      priority: "medium",
      category: "habits"
    });
  }

  if (insights.focusSessions >= 5 && moodValue >= 4) {
    suggestions.push({
      id: "celebrate",
      title: "Great Job Today! 🎉",
      description: `You're maintaining excellent focus and mood. Keep up this amazing streak!`,
      action: "View Achievements",
      icon: "⭐",
      priority: "low",
      category: "motivation"
    });
  }

  if (insights.focusPercentage > 60) {
    suggestions.push({
      id: "productive-day",
      title: "Productive Day Ahead",
      description: `Over ${insights.focusPercentage}% of your screen time is productive. You're on fire! 🔥`,
      action: "Keep the Momentum",
      icon: "🚀",
      priority: "low",
      category: "motivation"
    });
  }

  // Default motivational message
  if (suggestions.length === 0) {
    suggestions.push({
      id: "default",
      title: "You Got This! 💪",
      description: "The day is young. Make the most of it with focused work sessions.",
      action: "Get Started",
      icon: "✨",
      priority: "low",
      category: "motivation"
    });
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const getHealthStatusMessage = (health) => {
  const messages = {
    excellent: {
      emoji: "😄",
      title: "Excellent Health",
      message: "You're crushing your goals! Keep it up!"
    },
    good: {
      emoji: "😊",
      title: "Good Balance",
      message: "You're doing well. Small adjustments can help."
    },
    fair: {
      emoji: "😐",
      title: "Needs Attention",
      message: "Try to focus more and reduce distractions."
    },
    "needs-improvement": {
      emoji: "😟",
      title: "Time to Refocus",
      message: "Let's work on building better habits together."
    }
  };
  return messages[health] || messages["fair"];
};
