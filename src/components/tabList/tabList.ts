interface Tab extends HTMLAnchorElement {
  panel: HTMLElement;
}

function augmentTabList(tabList: HTMLElement) {
  if (tabList.classList.contains("isJSProcessed")) {
    return;
  }
  tabList.classList.add("isJSProcessed");

  let tabFocus = -1;
  const cache = new Map<string, number>();

  const tabs = (
    Array.from(tabList.querySelectorAll<Tab>('a[href^="#"][role="tab"]'))
  ).reduce((tabs: Tab[], tab, index) => {
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

  const setCurrentTabFromFocus = () => {
    const tab = tabs[tabFocus];
    if (!tab) {
      return;
    }
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
    tab.panel.setAttribute("aria-hidden", "false");
    tab.panel.removeAttribute("hidden");
  };

  const tabNext = () => (tabFocus === tabs.length - 1 ? 0 : tabFocus + 1);

  const tabPrevious = () => (tabFocus === 0 ? tabs.length - 1 : tabFocus - 1);

  const setNewTabFocus = (newFocus: number) => {
    if (newFocus === tabFocus) {
      return;
    }
    tabs[tabFocus]?.setAttribute("tabindex", "-1");
    tabFocus = newFocus;
    tabs[tabFocus]?.setAttribute("tabindex", "0");
    tabs[tabFocus]?.focus();
  };

  tabList.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const newFocus = e.key === "ArrowRight" ? tabNext() : tabPrevious();
      setNewTabFocus(newFocus);
    }
  });

  function onHashChange() {
    const index = cache.get(location.hash);
    if (index == null) {
      return;
    }
    tabFocus = index;
    setCurrentTabFromFocus();
  }

  if (tabFocus === -1) {
    tabFocus = 0;
  }

  window.addEventListener("hashchange", onHashChange);
  setCurrentTabFromFocus();
  onHashChange();
}

document.querySelectorAll<HTMLElement>('[role="tablist"]').forEach(
  augmentTabList,
);
