[![Latest Release](https://img.shields.io/github/release/AmericanMedicalAssociation/AMA-style-guide-2.svg)](https://github.com/AmericanMedicalAssociation/ama-style-guide-2/releases/latest)

# Living Style Guide 2 for AMAOne
This will be the new and improved living style guide for the American Medical Association. It is the canonical source for the Digital Technology Team's Drupal 8 work, as well as a platform-agnostic tool to empower employees and vendors to maintain consistent design and hierarchy throughout the AMA digital ecosystem.

This style guide is a compilation of [atomic components](http://bradfrost.com/blog/post/atomic-web-design/) that have been specifically tailored to the needs of AMA. By documenting and assembling this collection of patterns, we are able to build consistently, reuse code, and [see all of our patterns in one place](https://americanmedicalassociation.github.io/ama-style-guide-2/).

## Style Guide Consumers - To use this Style Guide on a project:
- Grab the [latest release](https://github.com/AmericanMedicalAssociation/AMA-style-guide-2/releases)
- Open the `.zip` into your project
- Link to the production files at `assets/`

## Style Guide Developers - To begin working:


**Environment setup (mac)**

 - Have [`homebrew`](https://brew.sh/) installed
 - `brew update`
 - `brew install nvm`
 - `nvm install v9.9.0`
 - `nvm use 9.9.0`
 - `nvm alias default v9.9.0`

**Just the first time:**

- `cd styleguide`
- `composer install`
- `npm install`
- `npm install -g gulp`
  - This will install gulp globally on your machine. If you don't have privileges, don't want to install globally, or need to manage multiple projects using `gulp`, you can invoke `gulp` via `./node_modules/.bin/gulp serve` instead of directly.
  
- `npm install -g backstopjs`
  - This will install BackstopJS globally

**For ongoing development**

- Before starting any work a corresponding JIRA ticket must be present.
- If a new pattern needs to be created the story must contain a business case, requirements and testing scenario for the pattern.


- `gulp serve` to watch files and display the resulting page in your local browser.
- Occasionally things might stop refreshing well. If that happens, just kill (`Control-C`) gulp and re-run.
- `gulp scss-lint` will check your SCSS for code quality. Please ensure your code lints successfully. A few notes:
  - We're using autoprefixer to get all the latest and greatest vendor prefixes. You should not need to use vendor prefixes in your code.
  - If you do need a vendor prefix (for device-specific changes, like `-webkit-appearance`) you can [disable linting for those lines](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#turning-rules-off-from-within-your-css).
- CSS sourcemaps are generated by gulp so you can see what files are generating the applicable css for each element. If you are seeing something like "style.css?123456789" when you inspect elements in your browser, check that you have "enabled CSS mapping" in your dev tools. [Chrome's developer documentation shows how to check your settings.](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps#enable_source_maps_in_settings)
- Javascript files in the style guide require special consideration. Please read [the original style guide documentation](https://github.com/AmericanMedicalAssociation/AMA-style-guide/blob/develop/docs/code_conventions.md#javascript) before writing new JS.

**Pattern Lab**
- Patterns have three corresponding files: patternName.twig, patternName.md, patternName.json and patternName.scss
- When pattern variations are created the json file name will contain the original pattern name followed with "as" "as-in" "with" the variation name. Example: "article-stub~as-related-content.json"
- Patterns do not have anything hard coded. Use corresponding json file to enter values. The json data contains the structure for that pattern.

- All patterns need a corresponding markdown file for example: membership.md
  - The corresponding pattern markdown file should follow along this format:
  
~~~~
    ---
    el: ".ama__membership"
    title: "Membership"
    ---
    
    The membership pattern includes a heading, a description, and a CTA button (optional).
    
    [EWL-3817](https://issues.ama-assn.org/browse/EWL-3817)
    [EWL-4214](https://issues.ama-assn.org/browse/EWL-4214)
    
    ### Variant options
    * [With CTA button](?p=molecules-membership-with-cta)
    
    ### Variables
    ~~~
    {
      "heading": {
        "level": int/required
        "text": string/required
        "class": "ama__h2"
      },
      "link": string/required
      "paragraph" : {
        "text": string/required
      },
      (optional) "button": {
        "text": string/optional
        "style": "primary"
      }
    }
    ~~~
~~~~

- New patterns should have a corresponding annotations file
- The annotations are located in source/annotations
- The annotation markdown file should be the pattern name
- The annotation file should contain the business use case and any restrictions
- For more informaton on Pattern Lab annotations refer to: http://patternlab.io/docs/pattern-adding-annotations.html
- Example of an annotation: 

~~~~
    ---
    el: .ama__article-stub .ama__article-stub__title
    title: Article stub header
    ---
    Max character length: 70-75
    
    Business Case:
      Something about how this pattern is used on the page
~~~~

**Glossary**
- So we can all be on the same page regarding terminology a glossary has been created: https://issues.ama-assn.org:8446/confluence/display/DTD/glossary
- Update the glossary when you create a new pattern or add to existing patterns. This will help ensure we are all talking about the same thing when features are requested or bugs are reported.

## Project Branches

This project will maintain a number of branches:

- `develop` - the (uncompiled) working branch
- `gh-pages` - the compiled, publicly accessible “testing” artifact
- `dev-assets` - the compiled production release that gets tagged.
- `visual-regression-testing-artifact/[PULL_REQUEST_ID]` - the visual regression test results from a Travis run. Users can access the BackstopJS report at `http://htmlpreview.github.io/?https://github.com/AmericanMedicalAssociation/ama-style-guide-2/blob/visual-regression-testing-artifact/[PULL_REQUEST_ID]/html_report/index.html`.

For more detail on how to deploy to these branches, see [Creating a Release](https://github.com/AmericanMedicalAssociation/AMA-style-guide/blob/develop/docs/creating_a_release.md)

## Visual Regression Testing (VRT)

`BackstopJS` is used for visual regression testing. This tool compares reference images (screenshots) to captured screenshots. A report is generated that highlights any differences.

References are always made from the latest production version of the style guide and are not stored in the repository.

For more detail on production releases are created, see [Creating a Release](https://github.com/AmericanMedicalAssociation/AMA-style-guide/blob/develop/docs/creating_a_release.md)

### Create References

Gulp can be used to generate references using the command, `gulp reference`.

You should create references when creating a new branch and again before submitting a pull request.

### Run Tests

Tests can be run either while the styleguide is being served or as a single command.

#### While Gulp is Serving the Style Guide

While `gulp serve` is running and the style guide is available, you can create the references with `gulp reference` and then run tests with `gulp backstop`. 

#### When Gulp is not Serving the Style Guide

You can use a single command to generate references and run the tests, `gulp test`.

### View Test Results

After the tests are run, a report page is available at `backstop_data/html_report/index.html`. This file can be opened in a browser to review the results. The full file path will depend on where you have this repository.

### Adding Tests

If a new pattern has been created a corresponding backstop test needs to be added. All backstop tests are located in backstop.js and are grouped by atomic sizing.

For more information on how to write a backstop test and setting up backstop refer to: https://github.com/garris/BackstopJS.

## Troubleshooting:
### Make sure your npm dependencies are up to date
If you run unto an unexpected error, you might just be missing a dependency

- Run `npm install` from the `styleguide` directory to grab any missing dependencies.

### Make sure node and npm are up to date(-ish)
You might have to do any or all of these

- Update node*

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

\* Node versions higher than `v9.9.0` are not yet supported, so please exercise caution when using these instructions. 

- Update npm

```
npm install -g npm
```

- Rebuild npm to recompile any outdated packages.

```
npm rebuild
```

## What's going on here?

### Responsive implementation
We are using [Breakpoint](http://breakpoint-sass.com/) to handle media queries for responsive implementation.

The first time you run `npm install` the dependency will be installed, but if you run into an error, running `npm install` again should fix the issue.


### How do I get rid of bloat and inline css in my SVG files?
When adding new SVG icon assets:

Inline CSS is bad because can affect other SVG files. Example: the `.st0`  class is included by Adobe Illustrator for some SVG icons. This can affect all the SVG files on the page that have a class called `.st0`.

The tool of choice for optimizing .svg icons is SVGO. It's lightweight and fast. 
- To install it, `cd` into your working project directory, and then run `npm install -g svgo`
- After you install SVGO, run `svgo [point to your SVG assets directory path]`
