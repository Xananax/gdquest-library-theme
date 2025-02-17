//@ts-check
/**
 * @param {Element} tabList
 */
function augmentTabList(tabList) {
  if (tabList.classList.contains("isJSProcessed")) {
    return;
  }
  tabList.classList.add("isJSProcessed");

  /**
   * @typedef {HTMLAnchorElement & { panel: HTMLElement}} Tab
   */
  let tabFocus = -1;
  /** @type {Map<string, number>} */
  const cache = new Map();

  const tabs = /** @type {Tab[]}*/ (
    Array.from(tabList.querySelectorAll('a[href^="#"][role="tab"]'))
  ).reduce((/** @type {Tab[]}*/ tabs, tab, index) => {
    const controlledId = tab.getAttribute("aria-controls");
    if (!controlledId || !tab.hash) {
      return tabs;
    }
    const controlledElement = document.getElementById(controlledId);
    if (!controlledElement) {
      return tabs;
    }
    if (tab.getAttribute("aria-selected") === "true") {
      tabFocus = index;
    }
    cache.set(tab.hash, index);
    tab.panel = controlledElement;
    tabs.push(tab);
    return tabs;
  }, []);

  const setTabFocus = () => {
    const tab = tabs[tabFocus];
    tabs.forEach((t) => {
      if (t == tab) {
        return;
      }
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
      t.panel.setAttribute("aria-hidden", "true");
      t.panel.setAttribute("hidden", "true");
    });
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.panel.setAttribute("hidden", "false");
    tab.panel.removeAttribute("hidden");
  };

  /** @type {HTMLElement}*/ (tabList).addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      tabs[tabFocus].setAttribute("tabindex", "-1");
      if (e.key === "ArrowRight") {
        tabFocus++;
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      } else if (e.key === "ArrowLeft") {
        tabFocus--;
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }
      tabs[tabFocus].setAttribute("tabindex", "0");
      tabs[tabFocus].focus();
    }
  });

  function onHashChange(){
    const index = cache.get(location.hash);
    if (index == null) {
      return;
    }
    tabFocus = index;
    setTabFocus();
  }

  
  if (tabFocus === -1) {
      tabFocus = 0;
    }
    
  window.addEventListener("hashchange", onHashChange);
  setTabFocus();
  onHashChange()
}

document.querySelectorAll('[role="tablist"]').forEach(augmentTabList);
