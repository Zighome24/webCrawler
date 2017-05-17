# Visualization of Navigable Links on a webpage
## VNL

Plan
======
#### The Goal
> To create a program with the ability to 'crawl' through a webpage and document the links on that webpage, and then move to those links and do the same on those pages.

### Needs:
1. A logical blocking statement or stopping point - given: no more links on a page
 * **simple**: leaving the domain of the original website
 * **complex**: Reaching a certain number of threads on a branch or nodes on a tree
 * **stupid**: Some sort of complex series of conditions involving the complexity of a page and the number of links on the page you were on previously
2. Record of the pages visited and information on each page - so that we can provide this information in other features
#####Optional:
3. Visualization of the links in a Node and Leaf diagram
 * Make each of the nodes clickable and have it link to the page your are looking at
 * Make each of the Nodes expand when you hover over them and provide info on separation level, how many links were on the page, and it's complexity

### Problems:
1. Finding the links on each page
2. Moving along the pages collected and executing the same program on all of those
3. Ensuring that the computer doesn't recursively drown its self in method stack calls and run out of memory
4. Ensuring the links collected are valid URL links and not references to a another portion of the domain
5.
