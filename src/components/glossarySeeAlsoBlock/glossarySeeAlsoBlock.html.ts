import { tmpl, ComponentString } from "../../depsServer.ts";
import { FileInText as FileInText } from "../fileInText/fileInText.html.ts";
import { CalloutsListSingleItem } from "../calloutsListSingleItem/calloutsListSingleItem.html.ts";
import { glossaryListTerms } from "../glossaryList/glossaryListTerms.ts";
const { h2, p, a, span, button, section, form, input, ul, li } = tmpl;


export const GlossarySeeAlsoBlock = () => section(
  { className: "glossarySeeAlsoBlock" },
  h2(null, "See Also"),
  p(null, "Related terms in the library"),
  ul(
    null,
    li(null, a({ href: "#" }, "Lambda Function")),
    li(null, a({ href: "#" }, "Lambda Function"))
  )
);

/**
<section class="glossarySeeAlsoBlock">
	<h2>See Also</h2>
	<p>Related terms in the library</p>
	<ul>
		<li>
			<a href="#">Lambda Function</a>
		</li>
		<li>
			<a href="#">Lambda Function</a>
		</li>
	</ul>
</section>

 */