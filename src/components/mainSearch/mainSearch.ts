import { button } from "../../js/deps.ts";

document.querySelectorAll(".mainSearch").forEach((searchWrapper) => {
  const selectedTermsContainer = searchWrapper.querySelector(
    ".mainSearchSelectedTerms",
  );

  if (!selectedTermsContainer) {
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);

  const getRemoveButtonIdForInput = (id: string) => `termButtonFor${id}`;

  const removeElementById = (id: string) => {
    const button = document.getElementById(id);
    if (button) {
      button.remove();
    }
  };

  const removeCategory = (categoryName: string, exceptValue = "") => {
    options.forEach((option) => {
      if (option.input.name === categoryName) {
        option.input.checked = option.input.value === exceptValue;
        removeElementById(getRemoveButtonIdForInput(option.input.id));
      }
    });
  };

  const removeTerm = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    if (input.type === "radio") {
      removeCategory(input.name);
    } else if (input.type === "checkbox") {
      input.checked = false;
    }
    removeElementById(getRemoveButtonIdForInput(id));
  };

  const addTerm = (id: string, name: string, labelText: string) => {
    selectedTermsContainer.append(
      button(
        {
          id: getRemoveButtonIdForInput(id),
          class: `button-${name}`,
          type: "button",
          onclick: () => removeTerm(id),
        },
        labelText,
      ),
    );
  };

  const onInputChange = (evt: Event) => {
    const input = evt.target as HTMLInputElement;
    const name = input.name;
    const checked = input.checked;
    const label = input.parentElement?.querySelector(
      `label[for=${input.id}]`,
    ) as HTMLLabelElement | null;
    const labelText = label?.textContent ?? "";
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
    searchWrapper.querySelectorAll<HTMLLabelElement>(
      [
        ".mainSearchFiltersCategory label",
        ".mainSearchFiltersFormat label",
        ".mainSearchFiltersGodotVersion label",
        ".mainSearchFiltersSubjectTags label",
      ].join(","),
    ),
  ).reduce(
    (arr: { label: HTMLLabelElement; input: HTMLInputElement }[], label) => {
      const input = document.getElementById(label.htmlFor) as
        | HTMLInputElement
        | null;

      if (!input) {
        return arr;
      }

      input.addEventListener("change", onInputChange);

      if (
        input.value !== "" &&
        urlParams.getAll(input.name).indexOf(input.value) !== -1
      ) {
        input.checked = true;
        addTerm(input.id, input.name, label.textContent ?? "");
      }

      arr.push({
        label,
        input,
      });
      return arr;
    },
    [],
  );

  document
    .querySelector(".mainSearchFiltersSubjectTagsClearLink")?.addEventListener(
      "click",
      () => {
        options.forEach((option) => {
          if (option.input.type === "checkbox") {
            removeTerm(option.input.id);
          }
        });
      },
    );
  document
    .querySelector(".mainSearchSelectedTermsClearAllButton")?.addEventListener(
      "click",
      () => {
        options.forEach((option) => {
          removeTerm(option.input.id);
        });
      },
    );
});
