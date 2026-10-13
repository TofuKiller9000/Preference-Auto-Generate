const departmentSelect = document.querySelector("#department");
const questionContainer = document.querySelector("#question-container");
const preferenceForm = document.querySelector("#preference-form");
const departmentDescription = document.querySelector("#department-description");
const output = document.querySelector("#output");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector("#copy-status");
const outputStatus = document.querySelector("#output-status");
const formError = document.querySelector("#form-error");
const resetButton = document.querySelector("#reset-button");

let generatedText = "";

function populateDepartments() {
  const departments = window.PREFERENCE_CONFIG.departments;

  for (const [key, department] of Object.entries(departments)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = department.label;
    departmentSelect.appendChild(option);
  }
}

function createQuestion(question) {
  const wrapper = document.createElement("div");
  wrapper.className = "question";

  const label = document.createElement("label");
  label.htmlFor = `question-${question.id}`;
  label.textContent = question.label;

  if (question.required) {
    label.textContent += " *";
  }

  let field;

  if (question.type === "select") {
    field = document.createElement("select");

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose an option...";
    field.appendChild(placeholder);

    for (const value of question.options) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      field.appendChild(option);
    }
  } else if (question.type === "textarea") {
    field = document.createElement("textarea");
    field.rows = 3;
    field.placeholder = question.placeholder || "";
  } else {
    throw new Error(`Unsupported question type: ${question.type}`);
  }

  field.id = `question-${question.id}`;
  field.name = question.id;
  field.required = Boolean(question.required);

  wrapper.append(label, field);
  return wrapper;
}

function renderQuestions() {
  const departmentKey = departmentSelect.value;
  const department =
    window.PREFERENCE_CONFIG.departments[departmentKey];

  questionContainer.replaceChildren();
  formError.textContent = "";
  clearOutput();

  if (!department) {
    departmentDescription.textContent =
      "Select a department to get started.";
    return;
  }

  departmentDescription.textContent = department.description;

  for (const question of department.questions) {
    questionContainer.appendChild(createQuestion(question));
  }
}

function clearOutput() {
  generatedText = "";
  output.value = "";
  copyButton.disabled = true;
  copyStatus.textContent = "";
  outputStatus.textContent = "Not generated";
}

function collectAnswers(department) {
  const answers = {};

  for (const question of department.questions) {
    const field = preferenceForm.elements.namedItem(question.id);
    answers[question.id] = field ? field.value.trim() : "";
  }

  return answers;
}

preferenceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";
  copyStatus.textContent = "";

  const department =
    window.PREFERENCE_CONFIG.departments[departmentSelect.value];

  if (!department) {
    formError.textContent = "Please choose a department.";
    return;
  }

  if (!preferenceForm.reportValidity()) {
    return;
  }

  const answers = collectAnswers(department);

  generatedText =
    window.PREFERENCE_CONFIG.formatPreference(department, answers);

  output.value = generatedText;
  copyButton.disabled = generatedText.length === 0;
  outputStatus.textContent = "Generated successfully";
});

departmentSelect.addEventListener("change", renderQuestions);

resetButton.addEventListener("click", () => {
  preferenceForm.reset();
  departmentSelect.value = "";
  renderQuestions();
  clearOutput();
  copyStatus.textContent = "";
});

copyButton.addEventListener("click", async () => {
  if (!generatedText) return;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(generatedText);
    } else {
      // Fallback for browsers without Clipboard API access.
      output.focus();
      output.select();

      const copied = document.execCommand("copy");

      if (!copied) {
        throw new Error("Copy command was unsuccessful.");
      }
    }

    copyStatus.textContent = "Copied to clipboard!";
  } catch (error) {
    copyStatus.textContent =
      "Copy was unavailable. Select the text above and copy it manually.";
  }
});

populateDepartments();
renderQuestions();
