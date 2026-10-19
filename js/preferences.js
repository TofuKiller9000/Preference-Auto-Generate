window.PREFERENCE_CONFIG = {
  departments: {
    denture: {
      label: "Denture Department",
      description: "Sample preferences for the denture department.",
      questions: [
        {
          id: "type",
          label: "Denture Type",
          type: "select",
          required: false,
          options: [
            "Ivocap",
            "Digital",
            "Ivotion"
          ]
        },
        {
          id: "teeth",
          label: "Teeth Type",
          type: "select",
          required: false,
          options: [
            "Economoy",
            "Premium"
          ]
        },
        {
          id: "name",
          label: "Name in Denture",
          type: "select",
          required: false,
          options: [
            "Yes - Always",
            "Yes - If at NC",
            "No"
          ]
        },
        {
          id: "postdam",
          label: "Post Dam",
          type: "select",
          required: false,
          options: [
            "Yes on Analog & Digital",
            "Yes on Analog & No on Digital",
            "No on Analog & Yes on Digital",
            "No on both Analog & Digital"
          ]
        },
        {
          id: "setup",
          label: "Set-Ups",
          type: "select",
          required: false,
          options: [
            "Idealized",
            "Characterized",
            "Follow study model when provided"
          ]
        },
        {
          id: "stippling",
          label: "Stippling",
          type: "select",
          required: false,
          options: [
            "Yes",
            "No"
          ]
        },
        {
          id: "festoon",
          label: "Festooning",
          type: "select",
          required: false,
          options: [
            "Yes",
            "No"
          ]
        },

        
    crownBridge: {
      label: "Fixed and Implant",
      description: "Sample preferences for the crown and bridge department.",
      questions: [
        {
          id: "occlusal",
          label: "Occlusal Contact",
          type: "select",
          required: true,
          options: [
            "Silver Hold",
            "Clear Hold",
            "Yellow",
            "Blue",
            "Black",
            "Double Black"
          ]
        },
        {
          id: "PC",
          label: "Interproximal Contacts",
          type: "select",
          required: true,
          options: [
            "Yellow",
            "Clear",
            "Silver", 
            "Tight", 
            "Extra Tight"
          ]
        },
        {
          id: "PCShape",
          label: "Contact Shape",
          type: "select",
          required: true,
          options: [
            "Standard",
            "Broad",
            "Extra Broad"
          ]
        },
        {
          id: "space",
          label: "Limited Occlusal Space",
          type: "select",
          required: true,
          options: [
            "Ok to reduce up to 0.75mm",
            "Ok to reduce up to 0.5mm",
            "Ok to reduce w/ reduction coping", 
            "Contact Office"
          ]
        },
                {
          id: "blanching",
          label: "Tissue Blanching",
          type: "select",
          required: true,
          options: [
            "None",
            "Ideal",
            "Light", 
            "Contact Office"
          ]
        },
        {
          id: "undercutdie",
          label: "Die Undercut",
          type: "select",
          required: true,
          options: [
            "Block out undercuts",
            "Contact Office",
            "Adjust prep & send reduction coping", 
            "Adjust prep & send note"
          ]
        },
          {
          id: "models",
          label: "Fabricate Models",
          type: "select",
          required: true,
          options: [
            "Yes",
            "No - unless needed",
          ]
        },
        {
          id: "pfm",
          label: "Alloy - PFM",
          type: "select",
          required: true,
          options: [
            "High Noble - Yellow",
            "High Noble - White",
            "Nobel - Yellow",
            "Nobel - White",
            "Base Non-Precious"
          ]
        },
        {
          id: "fcc",
          label: "Alloy - Full Cast Crown",
          type: "select",
          required: true,
          options: [
            "High Noble - Yellow",
            "High Noble - White",
            "Nobel - Yellow",
            "Nobel - White",
            "Base Non-Precious"
          ]
        },
        {
          id: "metalLingual",
          label: "Metal Lingual Needed",
          type: "select",
          required: true,
          options: [
            "Contact Office",
            "Proceed w/o call",
          ]
        },
        {
          id: "metalOcclusal",
          label: "Metal Occlusal Needed",
          type: "select",
          required: true,
          options: [
            "Contact Office",
            "Proceed w/o call",
          ]
        },
          {
          id: "diagnostic",
          label: "Diagnostic",
          type: "select",
          required: true,
          options: [
            "Digital diagnostic wax-up",
            "Hand-waxed",
            "Send STL file only"
          ]
        },
        {
          id: "matrix",
          label: "Diagnostic Model Matrix",
          type: "select",
          required: true,
          options: [
            "Putty",
            "Digital Exxis Matrix",
          ]
        },

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
