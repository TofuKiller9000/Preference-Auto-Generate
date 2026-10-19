window.PREFERENCE_CONFIG = {
  departments: {
    denture: {
      label: "Denture Department",
      description: "Sample preferences for the denture department.",
      questions: [ 
      orthodontics: {
      label: "Orthodontics",
      description: "Sample preferences for the orthodontics department.",
      questions: [
        {
          id: "workflow",
          label: "Workflow preference",
          type: "select",
          required: true,
          options: [
            "Standard workflow",
            "Digital workflow",
            "Confirm before proceeding"
          ]
        },
        {
          id: "delivery",
          label: "Delivery preference",
          type: "select",
          required: true,
          options: [
            "Standard",
            "Expedited",
            "Coordinate with office"
          ]
        },
        {
          id: "notes",
          label: "Additional instructions",
          type: "textarea",
          required: false,
          placeholder: "Enter fictional example instructions..."
        }
      ]
    }
  },

  /*
   * This formatter is intentionally generic.
   * Adapt its labels, ordering, and punctuation to your real style guide.
   */
  formatPreference(department, answers) {
    const lines = [`Department: ${department.label}`];

    for (const question of department.questions) {
      const answer = answers[question.id]?.trim();

      if (!answer) continue;

      const label = question.label.replace(/:$/, "");
      lines.push(`${label}: ${answer}`);
    }

    return lines.join("\n");
  }
};
