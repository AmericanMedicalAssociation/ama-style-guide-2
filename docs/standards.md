## SG2 Standards Checklist

Since SG2 is a living design library that is home to reusable patterns, it's important for all contributing developers to attempt to create patterns the same way. 

Any new work contributed into SG2 must meet the following standards:

### PatternLab Organization

#### How patterns are organized:
- Patterns should be listed alphabetically in the pattern list. No numbers (e.g. `atoms/forms/text-input` instead of `00-atoms/10-forms/05-text`). 
- The directory structure inside each pattern type (atoms, etc) should ve flat; patterns should _not_ go inside grouped subfolders
  - Bad: Atoms > Text > Heading
  - Good: Atoms > Heading
  - Good: Atoms > Link
- Talk about where SCSS and JS files should go (in a separate .scss directory?), as well as Twig and .md files (no subdirectories?). We may still need to make a decision about this.

##### Atoms
- An atom should be the basic HTML elements.
- They can sometimes be more than one element (e.g. an unordered list).

##### Molecules
- A molecule should include most of the markup and pull in atoms as necessary.
- Not every element in a molecule needs to be an atom.

##### Organisms
- Organisms should be very little markup, it should be mostly wrappers around molecules or atoms.

##### Templates
- Templates will be used for the general layouts (e.g. regions of the page) but not molecules

##### Pages
Pages are examples of a what a page (generally a node, although sometimes a view) will look like in the website. 

##### Base
Add a description of the "base" patterns here. Do they always get reused, or no?

Contains:
- "Colors" atom showing variables and base color palette.

### How to classify/name patterns
All pattern class names should follow standard [BEM practices](http://getbem.com/naming/) and be prefixed according to their theme (e.g. `ama__`). 

Below is an example of how a breadcrumb organism for the default AMA theme may appear:
```html
<section class="ama__breadcrumbs ">
  <nav class="ama__breadcrumbs__container">
    <ol class="ama__breadcrumbs__items">
      <li class="ama__breadcrumbs__item"><a href="#">Link 1</a></li>
      <li class="ama__breadcrumbs__item"><a href="#">Link 2</a></li>
    </ol>
  </nav>
</section>
```
This pattern shows that `breadcrumbs` is a block of the `ama` theme and has the elements `container`, `items` and `item`.

#### Pattern classification
See "PatternLab Organization" above. 
@todo - figure out a good/bad example.

#### Pattern scalability
It's important for patterns to be easily reusable.
- Patterns should use JSON data from an associated `.json` file for their content:
  - Bad: `<a href="link.html">I am a link</a>`
  - Good: `<a href="{{ link.url }}">{{ link.text }}</a>`

- Patterns should be named something that won't exclude them from being used somewhere else in the future.*
  - Bad: an atom named `login-form-password-field.twig`
  - Good: an atom named `password-field.twig`
  
  \* unless they are **not** intended to be reusable. This rule may apply more to smaller patterns (i.e. atoms). 

- Patterns should be coded to accept CSS classes or other HTML attributes from the patterns that include them.
  - Bad: `<div class="foo">{{ div.content }}</div>`
  - Good: `<div class="foo {{ div.class }}">{{ div.content }}</div>`

- Patterns should not include hard-coded styles or classes that may not apply to all instances in which the pattern is used.
  - Bad: `<div class="dropdown__list-item dropdown__list-item-foo dropdown__list-item-bar"></div>`
  - Good: `<div class="dropdown__list-item {{class}}"></div>`
  
#### Pattern consistency
- Patterns should generally adhere to the existing name/organization schema. File names, pattern organization within PatternLab, and code should appear in kind with the existing patterns in the library.

   - Bad: `<DIV><A HREF="{{ url }}"></A></ BR>`
  - Good: `<div><a href="{{ url }}"</a><br>`

#### Pattern namespacing
Pattern code should comply with the BEM naming system. 

  - Bad: `differentlyCapitalized.twig`  
  - Bad: `named-with-a-number2.twig`
  - Bad: `named_with_underscores.twig`
  - Bad: `atoms/our-special-project/header.twig`
  - Bad:
  ```twig
    <div class="header">
      <a href="{{ url }}" class="fancy-link">{{ content }}</a>
      <img src="{{ src }} class="fun-image">
    </div>
  ```
   - Good:
   ```twig
    <div class="header">
      <a href="{{ url }}" class="header__link--fancy">{{ content }}</a>
      <img src="{{ src }} class="header__image--fun">
    </div>
  ```
#### Pattern definition in `.md`
PatternLab users can view information about each pattern using the "Pattern Info" feature, whose content is supplied by data provided in a `.md` file.

Please follow the [template](#) for creating `pattern.md` files.
@todo: add template and update link.

### Checklist:
- [ ] classification: are the elements classified into patterns in a way that makes intuitive sense and aligns with our classification system? (See "PatternLab Organization" above.)
- [ ] scalability: is the pattern easily reusable if that is its intent, or is it too specific to be easily included elsewhere? Does the base pattern scale easily with the use of variants?
- [ ] consistency: is the pattern consistently classified, coded, and conceptualized with the existing patterns?
- [ ] namespacing: does the pattern code comply with the BEM naming system? Is it intuitively clear by looking at the markup what each element's purpose is?
- [ ] name descriptiveness: is the pattern named something that is, at a glance, recognizable? Is there an "official" (from the requirements) name for the pattern that should be used instead?
- [ ] content descriptiveness: is the placeholder content descriptive of the type of content that will go there (e.g. "helper text for input above" for helper text)?
- [ ] cohesion: was the pattern introduced to address an explicit feature, bug, or change request? Has the work followed the existing process for adding new work?
- [ ] definition: is the pattern fully documented in its `.md` file? Is it obvious from looking at the pattern what its purpose is and how it should be used?

#### Rules for naming:
- Pattern names should be vague human-readable descriptions of the component. Generally, we should attempt to use the same plain language that the business would use when that language is not used in a different way elsewhere. (e.g. Don't say refer to a component as a "module" because that word has other meaning in the scope of these projects.)
- Good: `ama__breadcrumbs`
- Bad: `list--ordered--wayfinder`

#### Naming pattern variants 
- Variants of patterns with the same data model should be pseudo patterns. Add docs from code_conventions.md here.
- Variants should be named “[base item] as [variant]” (e.g. "Header as overlay" or "Button as Secondary Color")
- Icons should have "icon" in the pattern name. 

### Documenting patterns
- We will create a template for the markdown files for SG2
- Variants should have their own MD files that point to the main item
- All patterns should have the following info in .md: x, y, z
- base colors have variables printed
- [PROBLEM] Pattern needs more useful presentation
- [PROBLEM] Pattern .md information is outdated

### Code standards
- [PROBLEM] Pattern needs DRYer code
- [PROBLEM] Pattern code is not correct/semantic/accessible/etc
- [PROBLEM] pattern code is missing 'alt' attributes

#### Add patterns using Twig and JSON

- When possible we should be using and extending Twig blocks
- Even header number can be passed in `<h{{ header.level }} `, etc.
- [PROBLEM] Pattern Twig isn't integrated properly in d8
- [PROBLEM] pattern code needs longhand / Twig namespacing
- [PROBLEM] Pattern has hard coded or static data model
- [PROBLEM] pattern code should leverage json array and twig loops

#### CSS
- Class names should follow standard BEM naming and be prefixed with `ama`
- [PROBLEM] Pattern needs more specific code (replace `.ama_theme` wrapper with `ama__` class prefix)
- Refrain from nesting things
- Utilize extends whenever possible
- Sass rules:
- A sass file for new patterns (?)
- Units of measurement
- Color names
- Globbing is fine as long as source maps are still included

#### Javascript
- JS approach
- JS functionality should be attached to js-<element> class (? We should double check if we really want to do this)
