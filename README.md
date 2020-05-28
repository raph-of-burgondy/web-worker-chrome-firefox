# web-worker-chrome-firefox

the web worker is very slow on firefox.
For this code, on my computer it' roughly 4x slower on Firefox compared to Chrome

Trying to simplify my code for publihing on [stackoveroverflow](https://stackoverflow.com/questions/62016168/web-workers-firefox-vs-chromium-chrome-and-ms-edge) I have found a solution... let's say it's more a hack !

Adding **anywhere** in the worker's message handler an blank `try {} catch {}` block the perfromance of Firefox is equivalent (and sometimes better :) than Chrome.

Explanation ?
