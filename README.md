# first-attempt
My page for getting up to speed with Github. First off, refresh my memory regards GF Markdown. This helps: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

###Goals in the longer term:###
1. Simulators - organization/factory/network sims in particular.
  * Use a mix of d3.js and angular.js: the first to handle SVG and transitions; the second to separate view from model.
  * Some fun examples: running a nuclear power station; manage the faulty cool-store; Beer game;
  * Customizable networks would be nice.
2. SPC - online tools for creating basic control charts
  * X-mR charts seem usefully generic to start with.
  * User should be able to simply paste data into a browser control.
3. Thinking tools - argument maps, decomposition diags, concept maps etc.
  * A gallery of famous circular arguments!
  * A way of showing social-network-like relationships: group memberships via FDG.
  * Conflict resolution and team-planning tools (EC/IO->Prerequisite tree)
  * Root-cause analysis: divergent and convergent forms.
4. Utilities.
  * I was thinking of a pivot-chart helper. Saw this today: http://blog.modeanalytics.com/slice-and-dice-pivot-charts/ 
 
###First project:###
Balanced production line simulator, with random breakdowns.
* This is loosely based on the "dice game" in *The Goal*.
* ~~Rather than vary the number of units made per *tick*, I'd like to keep the capacity fixed, but give each station a probability of breaking down during each cycle. This simply freezes the operation momentarily, but it should be enough to let chaos break out.~~ can set failrates and runtimes now.
* Animations would be fun: each operation has a queue of work to do (or not) which can be rendered as a stack of blocks. Animate something like Tetris? Pull from the bottom, add to the top.
* Probably useful to allow player to vary each work station's reliability during/before each run.
* Charts to show main KPIs? Things like WIP and mean lead-time...
* ~~Modularize, to allow several lines to run alongside each other, allowing direct comparison of scenarios.~~ done
* Each directive shows its own ops/stores and results.
* ~~Parameters: array of breakdown probabilities, one for each op. <jt-line-html failrate="[0.2,0.2,0.1,0.4,0.3]"></jt-line>~~ done
* First draft up: http://webappcoder.net.nz/examples/simulators/balanced-line/
