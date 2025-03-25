import { ThemeToggle } from './../themeToggle/themeToggle.html.ts';
import { tmpl, ComponentString, ImageResourceInfo, ParsedDate } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
import { PromoGDSchool } from "../promoGDSchool/promoGDSchool.html.ts";
import { ItemDiscordInvite } from "../itemDiscordInvite/itemDiscordInvite.html.ts";
import { ClapsButton } from "../clapsButton/clapsButton.html.ts";
import { HeaderSiteSearch } from "../headerSiteSearch/headerSiteSearch.html.ts";
const {
  h2,
  p,
  a,
  span,
  button,
  section,
  form,
  input,
  ul,
  li,
  img,
  div,
  h4,
  dl,
  dt,
  dd,
  ol,
  h3,
  em,
  article,
  nav,
  fieldset,
  legend,
  label,
  h5,
  noscript
} = tmpl;

const classPrefix = 'mainSearch';


// TODO: these should be generated from the content
const tags = [
  ['2D', '2D'],
  ['3D', '3D'],
  ['character_controller', 'Character Controller'],
  ['animation', 'Animation'],
  ['shader', 'Shader'],
  ['gdscript', 'GDScript'],
  ['state_machines', 'State Machine'],
  ['tilemaps', 'Tilemaps'],
  ['input', 'Input'],
  ['signals', 'Signals'],
  ['arrays', 'Arrays'],
  ['clipping_mask', 'Clipping Mask'],
] as const

const formats = [
  ['video', 'Video'],
  ['web_guide', 'Web Guide'],
  ['interactive', 'Interactive'],
  ['downloadable', 'Downloadable'],
] as const

const godotVersions = [
  ['4.x', 'Godot 4.x'],
  ['3.x', 'Godot 3.x'],
] as const

const categories = [
  ['learning_resources', 'Learning Resources',],
  ['assets_models', 'Assets Models',],
  ['shaders', 'Shaders',],
  ['tools_plugins', 'Tools & Plugins',],
] satisfies [string, string][]

const FilterBlock = (title: string, slug: string, children: string[]) => fieldset(
  {className: `${classPrefix}Filters${slug}`},
  legend(null, title),
  div(
    {className: `${classPrefix}FiltersItems ${classPrefix}Filters${slug}`},
    ...children
  )
)

const FilterInput = (slug: string, name: string, type="radio") => [
  input(
    {
      type: "checkbox",
      name: "tags",
      value: slug,
      id: `${classPrefix}FiltersTag${slug}`
    }),
  label(
    {
      htmlFor: `${classPrefix}FiltersTag${slug}`
    },
    name
  )].join('')

export const MainSearch = () => div(
  {className: [classPrefix, 'makeUsableWhenJSLoads'], style: {pointerEvents: 'none'}},
  form(
    {
      role: "search",
      method: "GET",
      ariaLabel: "Filter items",
      action:""}
  ,
    div(
      {className: `${classPrefix}Filters`, id: `${classPrefix}Filters`, popover: true},
      h5(
        {className: `${classPrefix}FiltersHeader`},
        span(null, "Filters"),
        button(
          {
            className: `${classPrefix}FiltersHeaderCloseButton`,
            popovertarget: `${classPrefix}Filters`,
            popovertargetaction: "hide",
            type: "button"
          },
          span(null, "Close Filters")
        )
      ),
      FilterBlock('Category', 'Category', categories.map(([slug, name])=> 
        FilterInput(slug, name, 'radio'))),
      FilterBlock('Tags', 'SubjectTags', tags.map(([slug, name])=>
        FilterInput(slug, name, 'checkbox'))),
      FilterBlock('Format', 'Format', formats.map(([slug, name])=>
        FilterInput(slug, name, 'radio'))),
      FilterBlock('Version', 'GodotVersion', godotVersions.map(([slug, name])=>
        FilterInput(slug, name, 'radio'))),
    ),
    div(
      {className: `${classPrefix}Field`},
      label(
        {htmlFor: `${classPrefix}FieldInput`, className: `${classPrefix}FieldLabel`},
        "Filter Items"
      ),
      input(
        {
          type: "search",
          name: "search",
          id: `${classPrefix}FieldInput`,
          placeholder: "Type one or several keywords",
          className: `${classPrefix}FieldInput`
        }
      ),
      button(
        {type: "submit", className: `${classPrefix}FieldButton`},
        span(null, "Submit Search Query")
      )
    ),
    div(
      {className: `${classPrefix}SelectedTerms`},
      button(
        {className: `${classPrefix}SelectedTermsClearAllButton`, type: "button"},
        "clear all"
      )
    )
  ),
  button(
    {className: `${classPrefix}FiltersButton`, popovertarget: `${classPrefix}Filters`},
    span(null, "Open Filter options")
  ),
  noscript(null, "this search box runs in the client and depends on Javascript. It won't work with Javascript disabled!")
)