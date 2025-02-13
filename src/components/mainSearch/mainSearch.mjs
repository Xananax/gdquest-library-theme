import { button } from "../../js/utils.mjs";

document.querySelectorAll(".mainSearch").forEach((searchWrapper) => {
  const form = searchWrapper.querySelector("form");

  const selectedTermsContainer = searchWrapper.querySelector(
    ".mainSearchSelectedTerms",
  );

  const urlParams = new URLSearchParams(window.location.search);

  const getRemoveButtonIdForInput = (id) => `termButtonFor${id}`;

  const removeElementById = (id) => {
    const button = document.getElementById(id);
    if (button) {
      button.remove();
    }
  };

  const removeCategory = (categoryName, exceptValue = "") => {
    options.forEach((option) => {
      if (option.input.name === categoryName) {
        option.input.checked = option.input.value === exceptValue;
        removeElementById(getRemoveButtonIdForInput(option.input.id));
      }
    });
  };

  const removeTerm = (id) => {
    const input = document.getElementById(id);
    if (input.type === "radio") {
      removeCategory(input.name);
    } else if (input.type === "checkbox") {
      input.checked = false;
    }
    removeElementById(getRemoveButtonIdForInput(id));
  };

  const addTerm = (id, name, label) => {
    selectedTermsContainer.append(
      button(
        {
          id: getRemoveButtonIdForInput(id),
          class: `button-${name}`,
          type: "button",
          onClick: () => removeTerm(id),
        },
        label,
      ),
    );
  };

  const onInputChange = (evt) => {
    /** @type HTMLInputElement */
    const input = evt.target;
    const name = input.name;
    const checked = input.checked;
    const label = input.parentElement.querySelector(`label[for=${input.id}]`);
    const labelText = label.textContent;
    if (input.value === "") {
      removeCategory(name);
    } else if (input.type === "radio" || input.type === "checkbox") {
      if (checked) {
        if (input.type === "radio") {
          removeCategory(input.name, input.value);
        }
        addTerm(input.id, name, labelText);
      } else {
        removeTerm(input.id);
      }
    }
  };

  const options = Array.from(
    searchWrapper.querySelectorAll(
      [
        ".mainSearchFiltersCategory label",
        ".mainSearchFiltersFormat label",
        ".mainSearchFiltersGodotVersion label",
        ".mainSearchFiltersSubjectTags label",
      ].join(","),
    ),
  ).map((/** HTMLLabelElement */ label) => {
    /** @type HTMLInputElement */
    const input = document.getElementById(label.htmlFor);

    if (!input) {
      return;
    }

    input.addEventListener("change", onInputChange);

    if (
      input.value !== "" &&
      urlParams.getAll(input.name).indexOf(input.value) !== -1
    ) {
      input.checked = true;
      addTerm(input.id, input.name, label.textContent);
    }

    return {
      label,
      input,
    };
  });

  document
    .querySelector(".mainSearchFiltersSubjectTagsClearLink")
    .addEventListener("click", () => {
      options.forEach((option) => {
        if (option.input.type === "checkbox") {
          removeTerm(option.input.id);
        }
      });
    });
  document
    .querySelector(".mainSearchSelectedTermsClearAllButton")
    .addEventListener("click", () => {
      options.forEach((option) => {
        removeTerm(option.input.id);
      });
    });
});
