# first-attempt
My page for getting up to speed with Github. First off, refresh my memory regards GF Markdown.

###Goals in the longer term:###
1. Simulators - organization/factory/network sims in particular.
    * Use a mix of d3.js and angular.js: the first to handle SVG and transitions; the second to separate view from model.
2.  SPC - online tools for creating basic control charts
3.  Thinking tools - argument maps, decomposition diags, concept maps etc.
    * A gallery of famous circular arguments!
    * A way of showing social-network-like relationships: group memberships via FDG.
    * Conflict resolution and team-planning tools (EC/IO->Prerequisite tree)
    * Root-cause analysis: divergent and convergent forms.

###First project:###
Balanced production line simulator, with random breakdowns.
* This is loosely based on the "dice game" in *The Goal*.
* Rather than vary the number of units made per *tick*, I'd like to keep the capacity fixed, but give each station a probability of breaking down during each cycle. This simply freezes the operation momentarily, but it should be enough to let chaos break out.
* Animations would be fun: each operation has a queue of work to do (or not) which can be rendered as a stack of blocks. Animate something like Tetris? Pull from the bottom, add to the top.
* Probably useful to allow player to vary each each work station's reliability.
* Charts to show main KPIs? Things like WIP and mean lead-time...
