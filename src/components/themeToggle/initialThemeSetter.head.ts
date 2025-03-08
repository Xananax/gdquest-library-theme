/**
 * This script should be loaded individually at the top of the page, as it _should_ block rendering until it has run.
 */
const theme = localStorage.getItem('theme');

if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}else{
  document.documentElement.classList.remove('dark');
}