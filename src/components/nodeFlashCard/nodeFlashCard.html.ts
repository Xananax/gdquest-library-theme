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

const classPrefix = 'nodeFlashCard';

export const NodeFlashCard = () => 
  li({className: classPrefix,}, 
    div({className: `${classPrefix}Header`}, 
      h3({className: `${classPrefix}HeaderTitle`}, "CharacterBody3D"), 
      div({ 
        className: `${classPrefix}HeaderIcon`, 
        style: { '--node-icon': 'url("/src/components/nodeFlashCard/example.png")' }
      })
    ),
     div({className: `${classPrefix}Body`}, 
      span({className: `${classPrefix}Badge`}, "3D"), 
      p({className: `${classPrefix}ShortDescription`}, "Detects collisions and controls 3D character motion"), 
      div({className: `${classPrefix}Usage`}, 
        h4({className: `${classPrefix}UsageTitle`}, "USE IT WHEN"), 
        p({className: `${classPrefix}UsageText`}, "You want to detects collisions with the environment and have full control over your 3D character's movement.")
      ),
        div({className: `${classPrefix}Examples`}, 
          h4({className: `${classPrefix}ExamplesTitle`}, "EXAMPLES"), 
          ul({className: `${classPrefix}ExamplesList`, role: 'list'}, 
            li(null, "Handle physics interactions your way"), 
            li(null, "Design 3D platformer movement as in Mario or Crash Bandicoot"), 
            li(null, "Design First Person Shooter movement")
          )
        )
      )
    )

/**
<li class="nodeFlashCard">
	<div class="nodeFlashCardHeader">
		<h3 class="nodeFlashCardHeaderTitle">CharacterBody3D</h3>
		<div
			class="nodeFlashCardHeaderIcon"
			aria-hidden="true"
			style="
				--node-icon: url(&quot;/src/components/nodeFlashCard/example.png&quot;);
			"
		></div>
	</div>
	<div class="nodeFlashCardBody">
		<span class="nodeFlashCardBadge">3D</span>
		<p class="nodeFlashCardShortDescription">
			Detects collisions and controls 3D character motion
		</p>
		<div class="nodeFlashCardUsage">
			<h4 class="nodeFlashCardUsageTitle">USE IT WHEN</h4>
			<p class="nodeFlashCardUsageText">
				You want to detects collisions with the environment and have
				full control over your 3D character's movement.
			</p>
		</div>
		<div class="nodeFlashCardExamples">
			<h4 class="nodeFlashCardExamplesTitle">EXAMPLES</h4>
			<ul class="nodeFlashCardExamplesList" role="list">
				<li>Handle physics interactions your way</li>
				<li>
					Design 3D platformer movement as in Mario or Crash Bandicoot
				</li>
				<li>Design First Person Shooter movement</li>
			</ul>
		</div>
	</div>
</li>

 */